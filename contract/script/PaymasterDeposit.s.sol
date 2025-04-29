// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {SmartPaymaster} from "../src/SmartPaymaster.sol";


contract PaymasterDeposit is Script {
    function run() external {
        // 1. Load environment variables/configuration
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address payable paymasterAddress = payable(vm.envAddress("PAYMASTER_ADDRESS"));
        uint256 depositAmount = vm.envUint("DEPOSIT_AMOUNT"); // in wei

        // 2. Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // 3. Call deposit function with ETH
        console.log("Depositing %s wei to paymaster at %s", depositAmount, paymasterAddress);
        SmartPaymaster paymaster = SmartPaymaster(paymasterAddress);
        paymaster.deposit{value: depositAmount}();
        
        vm.stopBroadcast();
    }
}