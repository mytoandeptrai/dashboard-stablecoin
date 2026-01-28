import { Button } from '@/components/ui/button';
import { useTranslation } from '@/integrations/i18n';
import { useOnboardingStore } from '@/stores/use-onboarding-store';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { mainnet, sepolia } from 'viem/chains';
import { useConnection, useSwitchChain } from 'wagmi';

const getTargetChainId = (network: 'testnet' | 'mainnet') => {
  return network === 'mainnet' ? mainnet.id : sepolia.id;
};

const ConnectWalletAction = () => {
  const { t } = useTranslation('common');
  const selectedNetwork = useOnboardingStore((state) => state.selectedNetwork);
  const { isConnected, chain } = useConnection();
  const switchChain = useSwitchChain();

  // Auto switch network when connected and selectedNetwork changes
  useEffect(() => {
    (async () => {
      if (!isConnected || !chain || !switchChain) return;

      const targetChainId = getTargetChainId(selectedNetwork);
      if (chain.id !== targetChainId) {
        await switchChain.mutateAsync({ chainId: targetChainId });
      }
    })();
  }, [isConnected, chain, selectedNetwork, switchChain]);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button size='sm' onClick={openConnectModal} type='button' className='h-9'>
                    {t('buttons.connect-wallet')}
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button size='sm' variant='outline' onClick={openChainModal} type='button' className='h-9'>
                    {t('buttons.wrong-network')}
                  </Button>
                );
              }

              return (
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={openChainModal}
                    className='flex h-9 items-center'
                    type='button'
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 12, height: 12 }} />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <Button size='sm' variant='outline' onClick={openAccountModal} type='button' className='h-9'>
                    {account.displayName}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletAction;
