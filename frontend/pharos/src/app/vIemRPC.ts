import { createWalletClient, createPublicClient, custom, formatEther, parseEther } from 'viem'
import { mainnet, polygonAmoy, sepolia, Chain } from 'viem/chains'
import { chainConfig } from '@/utils/web3auth-config';
import type { IProvider } from "@web3auth/base";

// Create a custom Pharos chain definition
const Pharos: Chain = {
  id: parseInt(chainConfig.chainId, 16),
  name: chainConfig.displayName,
  nativeCurrency: {
    name: chainConfig.tickerName,
    symbol: chainConfig.ticker,
    decimals: 18,
  },
  rpcUrls: {
    default: { http: [chainConfig.rpcTarget] },
    public: { http: [chainConfig.rpcTarget] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: chainConfig.blockExplorer },
  },
};

const getViewChain = (provider: IProvider): Chain => {
  switch (provider.chainId) {
    case "1":
      return mainnet;
    case "0x13882":
      return polygonAmoy;
    case "0xaa36a7":
      return sepolia;
    case "0xc352":
      return Pharos;
    default:
      return mainnet;
  }
}

const getChainId = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      transport: custom(provider)
    })

    const address = await walletClient.getAddresses()
    console.log(address)

    const chainId = await walletClient.getChainId()
    return chainId.toString();
  } catch (error) {
    return error;
  }
}

const getAccounts = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider)
    });

    const address = await walletClient.getAddresses();

    return address;
  } catch (error) {
    return error;
  }
}

const getBalance = async (provider: IProvider): Promise<string> => {
  try {
    const chain = getViewChain(provider);
    
    const publicClient = createPublicClient({
      chain,
      transport: custom(provider)
    })

    const walletClient = createWalletClient({
      chain,
      transport: custom(provider)
    });

    const address = await walletClient.getAddresses();

    const balance = await publicClient.getBalance({ address: address[0] });
    console.log(balance)
    return formatEther(balance);
  } catch (error) {
    return error as string;
  }
}

const sendTransaction = async (provider: IProvider): Promise<any> => {
  try {
    const chain = getViewChain(provider);
    
    const publicClient = createPublicClient({
      chain,
      transport: custom(provider)
    })

    const walletClient = createWalletClient({
      chain,
      transport: custom(provider)
    });

    // data for the transaction
    const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";
    const amount = parseEther("0.0001");
    const address = await walletClient.getAddresses();

    // Submit transaction to the blockchain
    const hash = await walletClient.sendTransaction({
      account: address[0],
      to: destination,
      value: amount,
      chain
    });
    console.log(hash)
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    return JSON.stringify(receipt, (key, value) =>
      typeof value === 'bigint'
        ? value.toString()
        : value // return everything else unchanged
    );
  } catch (error) {
    return error;
  }
}

const signMessage = async (provider: IProvider): Promise<any> => {
  try {
    const chain = getViewChain(provider);
    
    const walletClient = createWalletClient({
      chain,
      transport: custom(provider)
    });

    // data for signing
    const address = await walletClient.getAddresses();
    const originalMessage = "YOUR_MESSAGE";

    // Sign the message
    const hash = await walletClient.signMessage({
      account: address[0],
      message: originalMessage
    });

    console.log(hash)

    return hash.toString();
  } catch (error) {
    return error;
  }
}

const vIemRPC = { getChainId, getAccounts, getBalance, sendTransaction, signMessage };
export default vIemRPC;
