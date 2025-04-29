// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
import {ISenderCreator} from "lib/account-abstraction/contracts/interfaces/ISenderCreator.sol";
import {IEntryPoint} from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {SmartAccount} from "./SmartAccount.sol";

/**
 * Factory contract for deploying SmartAccount wallets using CREATE2 without upgradability.
 * The `createAccount` function is called by the EntryPoint via senderCreator during UserOp execution.
 */
contract SmartAccountFactory {
    ISenderCreator public immutable senderCreator;
    IEntryPoint public immutable entryPoint;

    constructor(IEntryPoint _entryPoint) {
        entryPoint = _entryPoint;
        senderCreator = _entryPoint.senderCreator();
    }

    /**
     * Deploys a new SmartAccount using CREATE2, or returns an existing one if already deployed.
     * Can only be called by senderCreator.
     */
    function createAccount(address owner, uint256 salt) public returns (SmartAccount ret) {
        require(msg.sender == address(senderCreator), "only callable from SenderCreator");

        address addr = getAddress(owner, salt);
        if (addr.code.length > 0) {
            return SmartAccount(payable(addr));
        }

        ret = new SmartAccount{salt: bytes32(salt)}(address(entryPoint), owner);
    }

    /**
     * Computes the counterfactual address of a SmartAccount as if it were deployed.
     */
    function getAddress(address owner, uint256 salt) public view returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(SmartAccount).creationCode,
            abi.encode(entryPoint, owner)
        );

        return Create2.computeAddress(bytes32(salt), keccak256(bytecode));
    }
}
