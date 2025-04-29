// backend/utils/userOpHashUtils.js
const { ethers } = require("ethers");

// Helper function to decode the UserOp data that's being sent to the contract
function decodeUserOpCallData(callData) {
  try {
    // Remove the function selector (first 4 bytes)
    const dataWithoutSelector = "0x" + callData.slice(10);

    // The getUserOpHash function accepts a tuple of the PackedUserOperation
    const abiCoder = ethers.AbiCoder.defaultAbiCoder();

    // Decode the function arguments - the packed user op
    const decoded = abiCoder.decode(
      [
        "tuple(address sender, uint256 nonce, bytes initCode, bytes callData, bytes32 accountGasLimits, uint256 preVerificationGas, bytes32 gasFees, bytes paymasterAndData, bytes signature)",
      ],
      dataWithoutSelector
    );

    const userOp = decoded[0];

    return {
      success: true,
      userOp: {
        sender: userOp.sender,
        nonce: userOp.nonce.toString(),
        initCodeLength: ethers.dataLength(userOp.initCode),
        initCodeHex: userOp.initCode,
        callDataLength: ethers.dataLength(userOp.callData),
        callDataHex: userOp.callData,
        accountGasLimits: userOp.accountGasLimits,
        preVerificationGas: userOp.preVerificationGas.toString(),
        gasFees: userOp.gasFees,
        paymasterAndDataLength: ethers.dataLength(userOp.paymasterAndData),
        paymasterAndDataHex: userOp.paymasterAndData,
        signatureLength: ethers.dataLength(userOp.signature),
        signatureHex: userOp.signature,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Manually calculate the user op hash
async function calculateUserOpHashOffchain(
  provider,
  userOp,
  entryPointAddress
) {
  try {
    // First get the chain ID
    const chainId = (await provider.getNetwork()).chainId;

    // Calculate the domain separator as per EIP-712
    const domainSeparator = ethers.TypedDataEncoder.hashDomain({
      name: "EntryPoint",
      version: "0.6.0",
      chainId: chainId,
      verifyingContract: entryPointAddress,
    });

    // Extract the data from the userOp fields
    const sender = userOp.sender;
    const nonce = BigInt(userOp.nonce);
    const initCodeHash = ethers.keccak256(userOp.initCode);
    const callDataHash = ethers.keccak256(userOp.callData);
    const accountGasLimits = userOp.accountGasLimits;
    const preVerificationGas = BigInt(userOp.preVerificationGas);
    const gasFees = userOp.gasFees;
    const paymasterAndDataHash = ethers.keccak256(userOp.paymasterAndData);

    // Create the struct hash per EIP-712
    // This is a simplified version and may need adjustment based on the specific EntryPoint implementation
    const structHash = ethers.keccak256(
      ethers.concat([
        ethers.toUtf8Bytes(
          "PackedUserOperation(address sender,uint256 nonce,bytes32 initCodeHash,bytes32 callDataHash,bytes32 accountGasLimits,uint256 preVerificationGas,bytes32 gasFees,bytes32 paymasterAndDataHash)"
        ),
        ethers.zeroPadValue(sender, 32),
        ethers.zeroPadValue(ethers.toBeHex(nonce), 32),
        initCodeHash,
        callDataHash,
        accountGasLimits,
        ethers.zeroPadValue(ethers.toBeHex(preVerificationGas), 32),
        gasFees,
        paymasterAndDataHash,
      ])
    );

    // Calculate the final hash (typed data hash)
    const userOpHash = ethers.keccak256(
      ethers.concat([
        ethers.toUtf8Bytes("\x19\x01"),
        ethers.getBytes(domainSeparator),
        ethers.getBytes(structHash),
      ])
    );

    return {
      success: true,
      userOpHash,
      details: {
        chainId: chainId.toString(),
        domainSeparator,
        structHash,
        initCodeHash,
        callDataHash,
        paymasterAndDataHash,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = {
  decodeUserOpCallData,
  calculateUserOpHashOffchain,
};
