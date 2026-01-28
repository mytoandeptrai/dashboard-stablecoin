import { useTranslation } from '@/integrations/i18n';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useOnboardingStore, type NetworkType } from '@/stores/use-onboarding-store';
import { useEffect, useState } from 'react';
import { useConnection } from 'wagmi';
import type { Option } from '@/types';

interface SelectNetworkDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const options: Option<NetworkType>[] = [
  {
    label: 'Testnet',
    value: 'testnet',
  },
  {
    label: 'Mainnet',
    value: 'mainnet',
  },
];

const useSelectNetworkDialog = () => {
  const { t } = useTranslation('common');

  const navigate = useNavigate();
  const setSelectedNetwork = useOnboardingStore((state) => state.setSelectedNetwork);
  const selectedNetwork = useOnboardingStore((state) => state.selectedNetwork);

  const { isConnected } = useConnection();

  const [isOpen, setIsOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(options[0].value);

  useEffect(() => {
    if (isConnected && !selectedNetwork) {
      setIsOpen(true);
    }
  }, [isConnected, selectedNetwork]);

  const onAccept = () => {
    setSelectedNetwork(currentOption);
    setIsOpen(false);
  };

  return {
    isOpen,
    onAccept,
  };
};

export const SelectNetworkDialog = ({ isOpen, onAccept, onDecline }: SelectNetworkDialogProps) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const selectedNetwork = useOnboardingStore((state) => state.selectedNetwork);
  const setSelectedNetwork = useOnboardingStore((state) => state.setSelectedNetwork);

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={true} onInteractOutside={(e) => e.preventDefault()} className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='font-bold text-xl'>{t('dialogs.select-network.title')}</DialogTitle>
          <DialogDescription className='text-base'>{t('dialogs.select-network.description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row gap-3 sm:gap-3'>
          <Button variant='outline' onClick={onDecline} className='flex-1'>
            {t('dialogs.select-network.cancel')}
          </Button>
          <Button variant='default' onClick={onAccept} className='flex-1'>
            {t('dialogs.select-network.accept')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
