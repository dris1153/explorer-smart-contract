import { mainnet, polygon, sepolia } from "viem/chains";

const chainsMainnet = [mainnet, polygon];
const chainsTestnet = [sepolia];
const chains = [...chainsMainnet, ...chainsTestnet];

export { chains, chainsTestnet };
