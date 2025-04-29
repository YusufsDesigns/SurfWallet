// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { Script } from "forge-std/Script.sol";
import { SmartAccountFactory } from "../src/SmartAccountFactory.sol";
import { SmartPaymaster } from "../src/SmartPaymaster.sol";
import { HelperConfig } from "../script/HelperConfig.s.sol";
import { IEntryPoint } from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";

contract DeployFactoryAndPaymaster is Script {
    IEntryPoint entryPoint;
    address USER = 0x1b9Cf1C441ba1740DfbF97dbA3E2Ef2b331b2A77;

    function run() public {
        deployFactoryAndPaymaster();
    }

    function deployFactoryAndPaymaster() public returns(HelperConfig.NetworkConfig memory, SmartAccountFactory, SmartPaymaster, IEntryPoint) {
        HelperConfig helperConfig = new HelperConfig();
        HelperConfig.NetworkConfig memory config = helperConfig.getConfig();

        entryPoint = IEntryPoint(config.entryPoint);
        vm.startBroadcast();
        SmartAccountFactory smartAccountFactory = new SmartAccountFactory(entryPoint);
        SmartPaymaster paymaster = new SmartPaymaster(entryPoint, USER);
        vm.stopBroadcast();

        return (config, smartAccountFactory, paymaster, entryPoint);
    }
}