import { WagmiProvider } from 'wagmi';
import { CONFIG_WAGMI } from './wagmi.config';

export function Provider({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={CONFIG_WAGMI}>{children}</WagmiProvider>;
}
