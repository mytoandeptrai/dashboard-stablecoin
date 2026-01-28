import ConnectWalletAction from '@/components/ui/connect-wallet-action';
import CreateNewCoinAction from '@/components/ui/create-new-coin-action';
import NetworkSelect from '@/components/ui/network-select';
import SearchTokenInput from '@/components/ui/search-token-input';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export default function AppHeader() {
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
        <div className='hidden md:flex md:w-64 lg:w-80'>
          <SearchTokenInput />
          <CreateNewCoinAction />
        </div>
      </div>
      <div className='flex items-center gap-3 pr-4 text-sm!'>
        <NetworkSelect />
        <ConnectWalletAction />
      </div>
    </header>
  );
}
