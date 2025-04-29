// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test, console2} from "forge-std/Test.sol";
import {SmartAccountFactory} from "../src/SmartAccountFactory.sol";
import {SmartAccount} from "../src/SmartAccount.sol";
import {SmartPaymaster} from "../src/SmartPaymaster.sol";
import {BasePaymaster} from "lib/account-abstraction/contracts/core/BasePaymaster.sol";
import {BaseAccount} from "lib/account-abstraction/contracts/core/BaseAccount.sol";
import {IEntryPoint} from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {ISenderCreator} from "lib/account-abstraction/contracts/interfaces/ISenderCreator.sol";
import {HelperConfig} from "../script/HelperConfig.s.sol";
import {SendPackedUserOp, PackedUserOperation} from "../script/SendPackedUserOp.s.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {DeployFactoryAndPaymaster} from "../script/DeployFactoryAndPaymaster.s.sol";

contract SmartAccountTest is Test {
    DeployFactoryAndPaymaster deployer;
    SmartAccountFactory factory;
    SmartPaymaster paymaster;
    HelperConfig.NetworkConfig config;
    IEntryPoint entryPoint;
    SendPackedUserOp sendPackedUserOp;
    ERC20Mock usdc;
    address USER = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    address randomUser = makeAddr("randomUser");
    uint256 constant STARTING_BALANCE = 10 ether;

    struct Call {
        address target;
        uint256 value;
        bytes data;
    }

    function setUp() public {
        deployer = new DeployFactoryAndPaymaster();
        (config, factory, paymaster, entryPoint) = deployer.deployFactoryAndPaymaster();
        sendPackedUserOp = new SendPackedUserOp();
        usdc = new ERC20Mock();

        paymaster.deposit{value: STARTING_BALANCE}();
        // address sender = factory.getAddress(USER, 1);
        // deal(sender, STARTING_BALANCE);
    }

    function testCreateAccount() public {
        // Arrange
        uint256 salt = 1;
        address sender = factory.getAddress(USER, salt);
        console2.log("Sender address: ", sender);
        console2.log("Sender code length: ", address(sender).code.length);

        // Act
        (PackedUserOperation memory packedUserOp,,) =
            sendPackedUserOp.generateSignedUserOperation(hex"", config, address(factory), USER, 1, sender, address(0));

        PackedUserOperation[] memory ops = new PackedUserOperation[](1);
        ops[0] = packedUserOp;

        vm.prank(randomUser);
        IEntryPoint(config.entryPoint).handleOps(ops, payable(randomUser));

        // Assert
        assertGt(address(sender).code.length, 0);
    }

    function testCreateAccountWithPaymaster() public {
        // Arrange
        uint256 salt = 1;
        address sender = factory.getAddress(USER, salt);

        // Act
        (PackedUserOperation memory packedUserOp,,) =
            sendPackedUserOp.generateSignedUserOperation(hex"", config, address(factory), USER, 1, sender, address(paymaster));

        PackedUserOperation[] memory ops = new PackedUserOperation[](1);
        ops[0] = packedUserOp;
        console2.log("userOp sender :", packedUserOp.sender);
        console2.log("userOp nonce :", packedUserOp.nonce);
        console2.logBytes(packedUserOp.initCode);
        console2.logBytes(packedUserOp.callData);
        console2.logBytes32(packedUserOp.accountGasLimits);
        console2.log("userOp preVerificationGas :", packedUserOp.preVerificationGas);
        console2.logBytes32(packedUserOp.gasFees);
        console2.logBytes(packedUserOp.paymasterAndData);
        console2.logBytes(packedUserOp.signature);

        vm.prank(randomUser);
        IEntryPoint(config.entryPoint).handleOps(ops, payable(randomUser));

        // Assert
        assertGt(address(sender).code.length, 0);
    }

    function testEntryPointCanExecuteCommandsWithPaymaster() public {
        // Arrange
        address sender = factory.getAddress(USER, 1);
        assertEq(usdc.balanceOf(sender), 0);
        address dest = address(usdc);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, sender, STARTING_BALANCE);
        bytes memory executeCallData = abi.encodeWithSelector(BaseAccount.execute.selector, dest, value, functionData);
        (PackedUserOperation memory packedUserOp,,) =
            sendPackedUserOp.generateSignedUserOperation(executeCallData, config, address(factory), USER, 1, sender, address(paymaster));

        PackedUserOperation[] memory ops = new PackedUserOperation[](1);
        ops[0] = packedUserOp;

        console2.log("EntryPoint Balance:", config.entryPoint.balance);

        // Act
        vm.prank(randomUser);
        IEntryPoint(config.entryPoint).handleOps(ops, payable(randomUser));

        // Assert
        assertEq(usdc.balanceOf(sender), STARTING_BALANCE);
    }

    function testEntryPointCanExecuteCommands() public {
        // Arrange
        address sender = factory.getAddress(USER, 1);
        assertEq(usdc.balanceOf(sender), 0);
        address dest = address(usdc);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, sender, STARTING_BALANCE);
        bytes memory executeCallData = abi.encodeWithSelector(BaseAccount.execute.selector, dest, value, functionData);
        (PackedUserOperation memory packedUserOp,,) =
            sendPackedUserOp.generateSignedUserOperation(executeCallData, config, address(factory), USER, 1, sender, address(0));

        PackedUserOperation[] memory ops = new PackedUserOperation[](1);
        ops[0] = packedUserOp;

        console2.log("EntryPoint Balance:", config.entryPoint.balance);

        // Act
        vm.prank(randomUser);
        vm.deal(config.entryPoint, STARTING_BALANCE);
        IEntryPoint(config.entryPoint).handleOps(ops, payable(randomUser));
        // Assert
        assertEq(usdc.balanceOf(sender), STARTING_BALANCE);
    }

    function testEntryPointCanExecuteBatchWithPaymaster() public {
        // Arrange
        address sender = factory.getAddress(USER, 1);
        assertEq(usdc.balanceOf(sender), 0);

        // Create two calls:
        Call[] memory calls = new Call[](2);

        // 1️⃣ Mint USDC to sender
        calls[0] = Call({
            target: address(usdc),
            value: 0,
            data: abi.encodeWithSelector(ERC20Mock.mint.selector, sender, STARTING_BALANCE)
        });

        // 2️⃣ Approve randomUser to spend USDC
        calls[1] = Call({
            target: address(usdc),
            value: 0,
            data: abi.encodeWithSelector(ERC20.approve.selector, randomUser, STARTING_BALANCE)
        });

        // Encode batch calldata
        bytes memory batchCallData = abi.encodeWithSelector(BaseAccount.executeBatch.selector, calls);

        // Build user operation
        (PackedUserOperation memory packedUserOp,,) =
            sendPackedUserOp.generateSignedUserOperation(batchCallData, config, address(factory), USER, 1, sender, address(paymaster));

        PackedUserOperation[] memory ops = new PackedUserOperation[](1);
        ops[0] = packedUserOp;

        // Fund entryPoint and act
        vm.prank(randomUser);
        entryPoint.handleOps(ops, payable(randomUser));

        // Assert
        assertEq(usdc.balanceOf(sender), STARTING_BALANCE);
        assertEq(usdc.allowance(sender, randomUser), STARTING_BALANCE);
    }

    function testEntryPointCanExecuteBatch() public {
        // Arrange
        address sender = factory.getAddress(USER, 1);
        assertEq(usdc.balanceOf(sender), 0);

        // Create two calls:
        Call[] memory calls = new Call[](2);

        // 1️⃣ Mint USDC to sender
        calls[0] = Call({
            target: address(usdc),
            value: 0,
            data: abi.encodeWithSelector(ERC20Mock.mint.selector, sender, STARTING_BALANCE)
        });

        // 2️⃣ Approve randomUser to spend USDC
        calls[1] = Call({
            target: address(usdc),
            value: 0,
            data: abi.encodeWithSelector(ERC20.approve.selector, randomUser, STARTING_BALANCE)
        });

        // Encode batch calldata
        bytes memory batchCallData = abi.encodeWithSelector(BaseAccount.executeBatch.selector, calls);

        // Build user operation
        (PackedUserOperation memory packedUserOp,,) =
            sendPackedUserOp.generateSignedUserOperation(batchCallData, config, address(factory), USER, 1, sender, address(0));

        PackedUserOperation[] memory ops = new PackedUserOperation[](1);
        ops[0] = packedUserOp;

        // Fund entryPoint and act
        vm.deal(address(entryPoint), STARTING_BALANCE);
        vm.prank(randomUser);
        entryPoint.handleOps(ops, payable(randomUser));

        // Assert
        assertEq(usdc.balanceOf(sender), STARTING_BALANCE);
        assertEq(usdc.allowance(sender, randomUser), STARTING_BALANCE);
    }

    function testExecuteBatchWithFailingCall() public {
        address sender = factory.getAddress(USER, 1);
        Call[] memory calls = new Call[](2);

        // 1️⃣ Mint a small amount
        calls[0] = Call({
            target: address(usdc),
            value: 0,
            data: abi.encodeWithSelector(ERC20Mock.mint.selector, sender, 10 ether)
        });

        // 2️⃣ Try transferring more than minted (should fail)
        calls[1] = Call({
            target: address(usdc),
            value: 0,
            data: abi.encodeWithSelector(ERC20.transfer.selector, randomUser, 999 ether)
        });

        bytes memory batchCallData = abi.encodeWithSelector(BaseAccount.executeBatch.selector, calls);

        (PackedUserOperation memory packedUserOp,,) =
            sendPackedUserOp.generateSignedUserOperation(batchCallData, config, address(factory), USER, 1, sender, address(0));

        PackedUserOperation[] memory ops = new PackedUserOperation[](1);
        ops[0] = packedUserOp;

        vm.deal(address(entryPoint), STARTING_BALANCE);
        vm.prank(randomUser);

        vm.expectRevert(); // Optionally: use vm.expectRevert(abi.encodeWithSelector(...)) for precision
        entryPoint.handleOps(ops, payable(randomUser));
    }
}
