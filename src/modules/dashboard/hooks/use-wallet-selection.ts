import { useCallback, useState } from 'react';
import { useConnection } from 'wagmi';
import { useOnboardingStore, type NetworkType } from '@/stores/use-onboarding-store';

export const useWalletSelection = () => {
  const { isConnected, address } = useConnection();

  // Store state
  const selectedNetwork = useOnboardingStore((state) => state.selectedNetwork);
  const setSelectedNetwork = useOnboardingStore((state) => state.setSelectedNetwork);
  const setNetworkSelected = useOnboardingStore((state) => state.setNetworkSelected);
  const networkSelected = useOnboardingStore((state) => state.networkSelected);
  const termsAccepted = useOnboardingStore((state) => state.termsAccepted);

  // Local state for network selection in modal
  const [localNetwork, setLocalNetwork] = useState<NetworkType>(selectedNetwork);

  // Dialog 1: Show connect wallet dialog when terms accepted but wallet not connected (use wagmi directly)
  const showConnectWalletDialog = termsAccepted && !isConnected;

  // Dialog 2: Show network selection dialog when wallet connected but network not selected
  const showNetworkSelectionDialog = termsAccepted && isConnected && !networkSelected;

  // Handler for Dialog 1 - Connect Wallet (no action needed - wagmi handles it)
  const handleWalletCancel = useCallback(() => {
    // Just close - user can try again
  }, []);

  // Handler for Dialog 2 - Network Selection
  const handleNetworkChange = useCallback((network: NetworkType) => {
    setLocalNetwork(network);
  }, []);

  const handleNetworkAccept = useCallback(() => {
    setSelectedNetwork(localNetwork);
    setNetworkSelected(true);
  }, [localNetwork, setSelectedNetwork, setNetworkSelected]);

  const handleNetworkCancel = useCallback(() => {
    // Just close - user can try again
  }, []);

  return {
    // Dialog 1: Connect Wallet
    showConnectWalletDialog,
    isConnected,
    address,
    handleWalletCancel,

    // Dialog 2: Network Selection
    showNetworkSelectionDialog,
    selectedNetwork: localNetwork,
    handleNetworkChange,
    handleNetworkAccept,
    handleNetworkCancel,
  };
};
