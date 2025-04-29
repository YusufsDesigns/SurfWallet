import { encodeFunctionData, Hex, keccak256, toBytes } from 'viem'
import { createPublicClient, createWalletClient, custom } from 'viem'
import { IProvider } from "@web3auth/base"
import vIemRPC from '@/app/vIemRPC'
import { config, pharosDevnet } from '@/config'
import { API_URL } from '@/constant'
import { serializeUserOp } from './serialization'

export interface UserOperation {
    sender: Hex
    nonce: bigint
    factory?: Hex
    factoryData?: Hex
    callData: Hex
    callGasLimit: bigint
    verificationGasLimit: bigint
    preVerificationGas: bigint
    maxFeePerGas: bigint
    maxPriorityFeePerGas: bigint
    paymaster?: Hex
    paymasterVerificationGasLimit?: bigint
    paymasterPostOpGasLimit?: bigint
    paymasterData?: Hex
    signature?: Hex
}

export async function getSmartWalletAddress(
    provider: IProvider,
    factoryAddress: Hex,
    ownerAddress: Hex
): Promise<Hex> {
    const publicClient = createPublicClient({
        chain: pharosDevnet,
        transport: custom(provider)
    })

    return await publicClient.readContract({
        address: factoryAddress,
        abi: [
            {
                inputs: [
                    { name: "owner", type: "address" },
                    { name: "salt", type: "uint256" }
                ],
                name: "getAddress",
                outputs: [{ name: "", type: "address" }],
                stateMutability: "view",
                type: "function"
            }
        ],
        functionName: "getAddress",
        args: [ownerAddress, addressToSalt(ownerAddress)]
    })
}

export async function isSmartWalletDeployed(address: Hex, provider: IProvider): Promise<boolean> {
    const publicClient = createPublicClient({
        chain: pharosDevnet,
        transport: custom(provider)
    })
    const code = await publicClient.getCode({ address })
    return code !== undefined && code !== '0x'
}

export async function getSmartWalletNonce(provider: IProvider, sender: Hex): Promise<bigint> {
    const publicClient = createPublicClient({
        chain: pharosDevnet,
        transport: custom(provider)
    })

    try {
        const nonce = await publicClient.readContract({
            address: sender,
            abi: [
                {
                    inputs: [],
                    name: "getNonce",
                    outputs: [{ name: "", type: "uint256" }],
                    stateMutability: "view",
                    type: "function"
                }
            ],
            functionName: "getNonce"
        })
        return BigInt(nonce)
    } catch {
        return BigInt(0)
    }
}

export async function createUserOp(
    provider: IProvider,
    transaction: {
        to: Hex
        value?: bigint
        data?: Hex
    },
    factoryAddress: Hex,
): Promise<UserOperation> {
    const [ownerAddress] = await vIemRPC.getAccounts(provider);
    const sender = await getSmartWalletAddress(provider, factoryAddress, ownerAddress);
    const isDeployed = await isSmartWalletDeployed(sender, provider);

    // Get paymaster data
    let paymasterData: Hex = '0x';
    try {
        const response = await fetch(`${API_URL}/api/paymaster/sign`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                sender,
                nonce: isDeployed ? await getSmartWalletNonce(provider, sender) : 0
            })
        });
        const paymasterInfo = await response.json();
        paymasterData = paymasterInfo.paymasterData || '0x';
    } catch (error) {
        console.error("Paymaster error:", error);
    }

    // Ensure all fields have defaults
    return {
        sender: sender.toLowerCase() as Hex,
        nonce: isDeployed ? await getSmartWalletNonce(provider, sender) : BigInt(0),
        factory: isDeployed ? '0x' : factoryAddress.toLowerCase() as Hex,
        factoryData: isDeployed ? '0x' : encodeFunctionData({
            abi: [{
                inputs: [
                    {name: "owner", type: "address"},
                    {name: "salt", type: "uint256"}
                ],
                name: "createAccount",
                outputs: [{name: "", type: "address"}],
                stateMutability: "nonpayable",
                type: "function"
            }],
            functionName: "createAccount",
            args: [ownerAddress, addressToSalt(ownerAddress)]
        }),
        callData: transaction?.data !== '0x' ? encodeFunctionData({
            abi: [{
                inputs: [
                    {name: "to", type: "address"},
                    {name: "value", type: "uint256"},
                    {name: "data", type: "bytes"}
                ],
                name: "execute",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function"
            }],
            functionName: "execute",
            args: [
                transaction.to, 
                transaction.value || BigInt(0), 
                transaction.data || '0x'
            ]
        }) : '0x',
        callGasLimit: BigInt(3000000),
        verificationGasLimit: BigInt(2000000),
        preVerificationGas: BigInt(1000000),
        maxFeePerGas: BigInt(1000000000),
        maxPriorityFeePerGas: BigInt(1000000000),
        paymaster: config.PAYMASTER_ADDRESS.toLowerCase() as Hex,
        paymasterVerificationGasLimit: BigInt(1000000),
        paymasterPostOpGasLimit: BigInt(50000),
        paymasterData,
        signature: '0x'
    };
}

export async function signUserOp(
    provider: IProvider,
    userOp: UserOperation,
): Promise<Hex> {
    const walletClient = createWalletClient({
        chain: pharosDevnet,
        transport: custom(provider)
    });

    const [address] = await walletClient.getAddresses();

    // Serialize the UserOp before sending
    const serializedUserOp = serializeUserOp(userOp);
    console.log("UserOp for signing:", userOp);
    console.log("Serialized UserOp for hash request:", serializedUserOp);
    
    // Add error handling for the hash request
    try {
        // Get hash from backend
        const response = await fetch(`${API_URL}/api/userOpHash`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userOp: serializedUserOp })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to get UserOp hash:", errorData);
            throw new Error(`Hash generation failed: ${JSON.stringify(errorData)}`);
        }

        const { userOpHash } = await response.json();
        console.log("Received userOpHash for signing:", userOpHash);
        
        if (!userOpHash || userOpHash === '0x' || userOpHash === '0x0000000000000000000000000000000000000000000000000000000000000000') {
            throw new Error("Invalid or empty userOpHash received");
        }

        // Sign the hash
        return await walletClient.signMessage({
            account: address,
            message: { raw: userOpHash as Hex }
        });
    } catch (error) {
        console.error("Error in signUserOp:", error);
        throw error;
    }
}

function addressToSalt(address: Hex): bigint {
    return BigInt(keccak256(toBytes(address)));
}