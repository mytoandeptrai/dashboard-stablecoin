import { env } from '@/constant';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'viem/chains';
import { http } from 'wagmi';

const mainnetConfig = {
  [mainnet.id]: http(),
};

const testnetConfig = {
  [sepolia.id]: http(),
};

export const CONFIG_WAGMI = getDefaultConfig({
  appName: env.PROJECT_NAME,
  projectId: env.PROJECT_ID,
  chains: [mainnet, sepolia],
  ssr: true,
  transports: {
    ...mainnetConfig,
    ...testnetConfig,
  },
});