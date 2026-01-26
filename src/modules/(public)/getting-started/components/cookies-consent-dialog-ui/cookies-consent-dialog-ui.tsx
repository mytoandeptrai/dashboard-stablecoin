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

interface CookiesConsentDialogUiProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const CookiesConsentDialogUi = ({ isOpen, onAccept, onDecline }: CookiesConsentDialogUiProps) => {
  const { t } = useTranslation('getting-started-page');

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={true} onInteractOutside={(e) => e.preventDefault()} className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='font-bold text-xl'>{t('cookies.title')}</DialogTitle>
          <DialogDescription className='text-base'>{t('cookies.description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row gap-3 sm:gap-3'>
          <Button variant='outline' onClick={onDecline} className='flex-1'>
            {t('cookies.decline')}
          </Button>
          <Button variant='default' onClick={onAccept} className='flex-1'>
            {t('cookies.accept')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
