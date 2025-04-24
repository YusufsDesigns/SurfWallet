"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { createConfig, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { chainConfig, WEB3AUTH_CLIENT_ID } from '../utils/web3auth-config';
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Chain } from 'viem/chains';

interface Web3AuthContextType {
  web3auth: Web3Auth | null;
  provider: IProvider | null;
  user: any | null;
  login: () => Promise<IProvider | null>;
  logout: () => Promise<void>;
  loading: boolean;
}

const queryClient = new QueryClient();

const Web3AuthContext = createContext<Web3AuthContextType | null>(null);

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error("useWeb3Auth must be used within a Web3AuthProvider");
  }
  return context;
};

export const Web3AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Define a custom chain for Pharos
  const pharosChain = {
    id: parseInt(chainConfig.chainId, 16),
    name: chainConfig.displayName,
    network: chainConfig.ticker.toLowerCase(),
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
  } as Chain;

  // Create wagmi config
  const config = createConfig({
    chains: [pharosChain],
    transports: {
      [pharosChain.id]: http(chainConfig.rpcTarget),
    },
  });
  
  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: {
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: chainConfig.chainId,
        rpcTarget: chainConfig.rpcTarget,
        displayName: chainConfig.displayName,
        blockExplorerUrl: chainConfig.blockExplorer,
        ticker: chainConfig.ticker,
        tickerName: chainConfig.tickerName,
      }
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId: WEB3AUTH_CLIENT_ID,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: chainConfig.chainId,
            rpcTarget: chainConfig.rpcTarget,
            displayName: chainConfig.displayName,
            blockExplorerUrl: chainConfig.blockExplorer,
            ticker: chainConfig.ticker,
            tickerName: chainConfig.tickerName,
          },
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider
        });

        await web3authInstance.initModal();
        setWeb3auth(web3authInstance);

        if (web3authInstance.status === "connected" && web3authInstance.provider) {
          setProvider(web3authInstance.provider);
          try {
            const userData = await web3authInstance.getUserInfo();
            setUser(userData);
          } catch (e) {
            console.log("No user logged in yet");
          }
        }
      } catch (error) {
        console.error("Error initializing Web3Auth:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async (): Promise<IProvider | null> => {
    if (!web3auth) {
      console.error("Web3Auth not initialized");
      return null;
    }
    
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      if (web3authProvider) {
        const userData = await web3auth.getUserInfo();
        setUser(userData);
      }
      return web3authProvider;
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  };

  const logout = async () => {
    if (!web3auth) {
      console.error("Web3Auth not initialized");
      return;
    }
    
    try {
      await web3auth.logout();
      setProvider(null);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value: Web3AuthContextType = {
    web3auth,
    provider,
    user,
    login,
    logout,
    loading,
  };

  return (
    <Web3AuthContext.Provider value={value}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
      </WagmiProvider>
    </Web3AuthContext.Provider>
  );
};