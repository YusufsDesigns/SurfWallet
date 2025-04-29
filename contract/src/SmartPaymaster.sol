// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IEntryPoint} from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {BasePaymaster} from "lib/account-abstraction/contracts/core/BasePaymaster.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {PackedUserOperation} from "lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract SmartPaymaster is BasePaymaster {
    using ECDSA for bytes32;

    /// @notice Address allowed to sign paymaster approvals
    address public signer;

    /// @dev Custom errors
    error SmartPaymaster__InvalidSignature();
    error SmartPaymaster__OnlyEntryPoint();
    error SmartPaymaster__ZeroAddress();

    constructor(IEntryPoint _entryPoint, address _signer) BasePaymaster(_entryPoint) {
        if (address(_entryPoint) == address(0) || _signer == address(0)) {
            revert SmartPaymaster__ZeroAddress();
        }
        entryPoint = _entryPoint;
        signer = _signer;
    }

    /// @notice Validates that a user signed the intent to use the paymaster
    function _validatePaymasterUserOp(PackedUserOperation calldata userOp, bytes32 userOpHash, uint256 /* maxCost */ )
        internal
        view
        override
        returns (bytes memory context, uint256 validationData)
    {
        (userOpHash);
        
        require(msg.sender == address(entryPoint), "SmartPaymaster__OnlyEntryPoint");

        // Extract signature (now starts at offset 52)
        bytes calldata signature = userOp.paymasterAndData[52:];

        bytes32 hash = keccak256(abi.encode(userOp.sender, userOp.nonce));
        bytes32 ethSignedHash = MessageHashUtils.toEthSignedMessageHash(hash);

        require(ethSignedHash.recover(signature) == signer, "SmartPaymaster__InvalidSignature");

        return ("", 0);
    }

    /// @notice No refund/post-processing needed
    function _postOp(
        PostOpMode, /* mode */
        bytes calldata, /* context */
        uint256, /* actualGasCost */
        uint256 /* actualUserOpFeePerGas */
    ) internal override {
        // intentionally left blank
    }

    /// @notice Admin function to change the trusted signer
    function setSigner(address _signer) external onlyOwner {
        if (_signer == address(0)) revert SmartPaymaster__ZeroAddress();
        signer = _signer;
    }

    /// @notice Fund the paymaster with native gas token
    receive() external payable {}
}
