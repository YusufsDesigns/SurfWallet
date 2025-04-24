export const chainConfig = {
    chainNamespace: "eip155",
    chainId: "0xc352", // Replace with Pharos chain ID in hex
    rpcTarget: "https://devnet.dplabs-internal.com/",
    displayName: "Pharos Devnet",
    blockExplorer: "https://pharosscan.xyz/",
    ticker: "P", // Replace with actual token symbol
    tickerName: "Pharos", // Replace with actual token name
  };
  
  export const WEB3AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "BKBEVcgYuaUDw8fXJH63i12IVWJ6YYqqopbz9ZNWqLV";