// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {EntryPoint} from "account-abstraction/core/EntryPoint.sol";
import {console2} from "forge-std/console2.sol";

contract DeployEntryPoint is Script {
    function run() public {
        deployEntryPoint();
    }

    function deployEntryPoint() public returns(address) {
        vm.startBroadcast();
        EntryPoint entryPoint = new EntryPoint();
        vm.stopBroadcast();

        console2.log("EntryPoint deployed to:", address(entryPoint));
        return address(entryPoint);
    }
}