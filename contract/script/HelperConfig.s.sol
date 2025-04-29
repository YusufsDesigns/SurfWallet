// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { Script, console2 } from "forge-std/Script.sol";
import { SmartAccount } from "./../src/SmartAccount.sol";
import { EntryPoint } from "account-abstraction/core/EntryPoint.sol";

contract HelperConfig is Script {
    error HelperConfig__InvalidChainId();

    struct NetworkConfig {
        address entryPoint;
        address account;
    }

    uint256 constant PHAROS_CHAIN_ID = 50002;
    uint256 constant LOCAL_CHAIN_ID = 31337;

    address constant BURNER_WALLET = 0x1f4D4f7de2098c168d372461083A537a54F99985;
    address constant FOUNDRY_DEFAULT_WALLET = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    NetworkConfig public localNetworkConfig;
    mapping (uint256 chainId => NetworkConfig) public networkConfigs;

    constructor() {
        networkConfigs[PHAROS_CHAIN_ID] = getPharosConfig();
    }

    function getConfig() public returns (NetworkConfig memory) {
        return getConfigByChainId(block.chainid);
    }

    function getConfigByChainId(uint256 chainId) public returns (NetworkConfig memory) {
        if (chainId == LOCAL_CHAIN_ID) {
            return getOrCreateAnvilEthChain();
        } else if (networkConfigs[chainId].account != address(0)) {
            return networkConfigs[chainId];
        } else {
            revert HelperConfig__InvalidChainId();
        }
    }

    function getPharosConfig() public pure returns (NetworkConfig memory) {
        return NetworkConfig({
            entryPoint: 0x505914B2BF3845Ff81B83c9765F3C1AEb3C97F19, // 🔁 Replace with actual Pharos entry point
            account: BURNER_WALLET
        });
    }

    function getOrCreateAnvilEthChain() public returns (NetworkConfig memory) {
        if (localNetworkConfig.account != address(0)) {
            return localNetworkConfig;
        }

        console2.log("Deploying Mock EntryPoint...");
        vm.startBroadcast(FOUNDRY_DEFAULT_WALLET);
        EntryPoint entryPoint = new EntryPoint();
        vm.stopBroadcast();

        localNetworkConfig = NetworkConfig({
            entryPoint: address(entryPoint),
            account: FOUNDRY_DEFAULT_WALLET
        });

        return localNetworkConfig;
    }
}
