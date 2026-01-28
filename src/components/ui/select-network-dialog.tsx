import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslation } from '@/integrations/i18n';

interface SelectNetworkDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const SelectNetworkDialog = ({ isOpen, onAccept, onDecline }: SelectNetworkDialogProps) => {
  const { t } = useTranslation('common');

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
