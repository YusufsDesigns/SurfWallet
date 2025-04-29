import { UserOperation } from "./userOpUtils";

// Update your serializeUserOp function to ensure all fields are properly formatted
export function serializeUserOp(userOp: UserOperation): Record<string, any> {
    // Ensure we're working with a copy to avoid modifying the original
    const serialized: Record<string, any> = {};

    // Handle the core fields
    serialized.sender = userOp.sender?.toLowerCase() || '0x';
    serialized.nonce = userOp.nonce?.toString() || '0';

    // Handle factory data
    if (userOp.factory && userOp.factory !== '0x') {
        serialized.factory = userOp.factory.toLowerCase();
        serialized.factoryData = userOp.factoryData || '0x';
    }

    // Always provide callData (even if empty)
    serialized.callData = userOp.callData || '0x';

    // Gas parameters as strings
    serialized.callGasLimit = userOp.callGasLimit?.toString() || '0';
    serialized.verificationGasLimit = userOp.verificationGasLimit?.toString() || '0';
    serialized.preVerificationGas = userOp.preVerificationGas?.toString() || '0';
    serialized.maxFeePerGas = userOp.maxFeePerGas?.toString() || '0';
    serialized.maxPriorityFeePerGas = userOp.maxPriorityFeePerGas?.toString() || '0';

    // Handle paymaster data
    if (userOp.paymaster && userOp.paymaster !== '0x') {
        serialized.paymaster = userOp.paymaster.toLowerCase();
        serialized.paymasterVerificationGasLimit = userOp.paymasterVerificationGasLimit?.toString() || '0';
        serialized.paymasterPostOpGasLimit = userOp.paymasterPostOpGasLimit?.toString() || '0';
        serialized.paymasterData = userOp.paymasterData || '0x';
    }

    // Handle signature (if present)
    if (userOp.signature) {
        serialized.signature = userOp.signature;
    }

    // Debug output to check serialization
    console.log("Serialized UserOp:", serialized);

    return serialized;
}