import type { UseFormReturn } from 'react-hook-form';
import { useTranslation } from '@/integrations/i18n';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { FormInput } from '@/components/form-fields/form-input';
import type { UserInfoFormValues } from '../../hooks/schema';

interface UserInfoDialogUiProps {
  isOpen: boolean;
  form: UseFormReturn<UserInfoFormValues>;
  isValid: boolean;
  isSubmitting: boolean;
  onSubmit: (values: UserInfoFormValues) => void;
  onCancel: () => void;
}

export const UserInfoDialogUi = ({
  isOpen,
  form,
  isValid,
  isSubmitting,
  onSubmit,
  onCancel,
}: UserInfoDialogUiProps) => {
  const { t } = useTranslation('getting-started-page');

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false} onInteractOutside={(e) => e.preventDefault()} className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle className='font-bold text-xl'>{t('userInfo.title')}</DialogTitle>
        </DialogHeader>

        <p className='text-muted-foreground text-sm italic'>{t('userInfo.description')}</p>

        <FormWrapper form={form} onSubmit={onSubmit} className='space-y-4'>
          <FormInput
            control={form.control}
            name='firstName'
            label={t('userInfo.firstName')}
            placeholder={t('userInfo.firstName')}
            required
          />

          <FormInput
            control={form.control}
            name='lastName'
            label={t('userInfo.lastName')}
            placeholder={t('userInfo.lastName')}
            required
          />

          <FormInput
            control={form.control}
            name='email'
            label={t('userInfo.email')}
            type='email'
            placeholder={t('userInfo.email')}
            required
          />

          <div className='space-y-2 pt-2 text-center'>
            <p className='font-medium text-sm'>{t('userInfo.privacyPolicy')}</p>
            <p className='text-muted-foreground text-sm'>{t('userInfo.termsText')}</p>
          </div>

          <DialogFooter className='flex-row gap-3 pt-4 sm:gap-3'>
            <Button type='button' variant='outline' onClick={onCancel} className='flex-1'>
              {t('userInfo.cancel')}
            </Button>
            <Button type='submit' variant='default' disabled={!isValid || isSubmitting} className='flex-1'>
              {t('userInfo.accept')}
            </Button>
          </DialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};
