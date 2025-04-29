// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {PackedUserOperation} from "lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import {HelperConfig} from "../script/HelperConfig.s.sol";
import {IEntryPoint} from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract SendPackedUserOp is Script {
    using MessageHashUtils for bytes32;
    uint256 ANVIL_DEFAULT_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

    function run() public {}

    function generateSignedUserOperation(
        bytes memory callData,
        HelperConfig.NetworkConfig memory config,
        address factory,
        address owner,
        uint256 salt,
        address sender,
        address paymasterAddress
    ) public view returns (PackedUserOperation memory, bytes32, bytes32) {
        uint256 nonce = vm.getNonce(sender);
        bytes memory initCode = buildInitCode(factory, owner, salt);
        PackedUserOperation memory userOp = _generateUnsignedUserOperation(callData, sender, initCode, nonce);
        bytes32 userOpHash = IEntryPoint(config.entryPoint).getUserOpHash(userOp);

        // === 1. Build paymaster signature ===
        if (paymasterAddress == address(0)) {
            userOp.paymasterAndData = hex"";
        } else {
            bytes32 paymasterHash = keccak256(abi.encode(userOp.sender, userOp.nonce));
            bytes32 ethSignedPaymasterHash = paymasterHash.toEthSignedMessageHash();

            uint8 vPm;
            bytes32 rPm;
            bytes32 sPm;

            if (block.chainid == 31337) {
                (vPm, rPm, sPm) = vm.sign(ANVIL_DEFAULT_KEY, ethSignedPaymasterHash);
            } else {
                (vPm, rPm, sPm) = vm.sign(config.account, ethSignedPaymasterHash);
            }

            bytes memory paymasterSignature = abi.encodePacked(rPm, sPm, vPm);
            uint64 paymasterVerificationGas = 500_000; // Should match your paymaster's needs
            uint64 paymasterPostOpGas = 100_000; // Should match your paymaster's needs

            userOp.paymasterAndData = abi.encodePacked(
                paymasterAddress,
                bytes16(uint128(paymasterVerificationGas)),
                bytes16(uint128(paymasterPostOpGas)),
                paymasterSignature
            );
        }

        // === 2. Get the UserOp hash ===
        bytes32 finalUserOpHash = IEntryPoint(config.entryPoint).getUserOpHash(userOp);
        bytes32 digest = finalUserOpHash.toEthSignedMessageHash();

        // === 3. Sign userOp with account private key ===
        uint8 vAcc;
        bytes32 rAcc;
        bytes32 sAcc;

        if (block.chainid == 31337) {
            (vAcc, rAcc, sAcc) = vm.sign(ANVIL_DEFAULT_KEY, digest);
        } else {
            (vAcc, rAcc, sAcc) = vm.sign(config.account, digest);
        }
        userOp.signature = abi.encodePacked(rAcc, sAcc, vAcc);

        return (userOp, digest, userOpHash);
    }

    function buildInitCode(address factory, address owner, uint256 salt) public pure returns (bytes memory) {
        if (factory == address(0) || owner == address(0)) {
            return hex"";
        }

        bytes memory callData = abi.encodeWithSignature("createAccount(address,uint256)", owner, salt);
        return abi.encodePacked(factory, callData);
    }

    function _generateUnsignedUserOperation(bytes memory callData, address sender, bytes memory initCode, uint256 nonce)
        internal
        pure
        returns (PackedUserOperation memory)
    {
        // Use uint128 instead of uint64 to match UserOperationLib's unpacking
        uint128 verificationGasLimit = 2_000_000;
        uint128 callGasLimit = 300_000;
        uint256 preVerificationGas = 100_000; // Remains uint256 as it's not packed
        uint128 maxPriorityFeePerGas = 1_000_000_000; // 1 gwei
        uint128 maxFeePerGas = 1_000_000_000; // 1 gwei

        // Pack using 128-bit values (left shift by 128 bits)
        bytes32 accountGasLimits = bytes32((uint256(verificationGasLimit) << 128 | uint256(callGasLimit)));

        bytes32 gasFees = bytes32((uint256(maxPriorityFeePerGas) << 128) | uint256(maxFeePerGas));

        return PackedUserOperation({
            sender: sender,
            nonce: nonce,
            initCode: initCode,
            callData: callData,
            accountGasLimits: accountGasLimits,
            preVerificationGas: preVerificationGas,
            gasFees: gasFees,
            paymasterAndData: hex"",
            signature: hex""
        });
    }
}
