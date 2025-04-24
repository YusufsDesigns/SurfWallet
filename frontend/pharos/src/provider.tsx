'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';

import { config } from './wagmi';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode theme={lightTheme({
            accentColor: '#703844',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
        })}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}