import { Button } from '@/components/ui/button';
import SearchKbarInput from '@/components/ui/kbar/search-kbar-input';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { useTranslation } from '@/integrations/i18n';
import { cn } from '@/lib/utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function AppHeader() {
  const { t } = useTranslation('common');
  const { open, isMobile } = useSidebar();
  return (
    <header
      className={cn(
        'fixed top-0 z-10 flex h-16 w-[calc(100dvw-var(--sidebar-width))] shrink-0 items-center justify-between gap-2 bg-background',
        {
          'w-[calc(100dvw-var(--sidebar-width-icon))]': !open,
          'w-full': isMobile,
        }
      )}
    >
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
        <div className='hidden md:flex'>
          <SearchKbarInput />
        </div>
      </div>
      <div className='flex items-center gap-3 pr-4 text-sm!'>
        {/* <ConnectButton label={text} accountStatus='address' chainStatus='icon' showBalance={false} /> */}

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
                      <Button size='sm' onClick={openConnectModal} type='button'>
                        {t('buttons.connect-wallet')}
                      </Button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <Button size='sm' variant='outline' onClick={openChainModal} type='button'>
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
                        className='flex items-center'
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
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </Button>

                      <Button size='sm' variant='outline' onClick={openAccountModal} type='button'>
                        {account.displayName}
                      </Button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </header>
  );
}
