import { defineChain } from "viem";

export const pharosDevnet = defineChain({
    id: 50002,
    name: 'Pharos Devnet',
    network: 'pharos-devnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Pharos Test Token',
        symbol: 'PTT',
    },
    rpcUrls: {
        default: {
            http: ['https://devnet.dplabs-internal.com'],
            webSocket: ['wss://devnet.dplabs-internal.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'PharosScan',
            url: 'https://pharosscan.xyz/',
        },
    },
});

export const config = {
    PAYMASTER_ADDRESS: "0xeC17FE9bFc20a38bBEC869ECED85603Cd1Fb9d34",
    FACTORY_ADDRESS: "0xd61ebf22825e91078ec795e243aff5127e41a5d5",
    ENTRYPOINT_ADDRESS: "0xb3dfdddf64d291d828891d4b6593747f12861ea1"
}