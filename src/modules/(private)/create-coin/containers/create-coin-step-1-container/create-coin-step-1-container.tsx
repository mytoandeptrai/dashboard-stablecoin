import { FormInput } from '@/components/form-fields/form-input';
import { Paragraph } from '@/components/ui/typography';
import { VStack } from '@/components/utilities';
import { useTranslation } from '@/integrations/i18n';
import type { FCC } from '@/types';
import { useFormContext } from 'react-hook-form';
import type { StablecoinFormData } from '../../hooks';

type CreateCoinStep_1ContainerProps = {
  isLoading?: boolean;
};

const CreateCoinStep_1Container: FCC<CreateCoinStep_1ContainerProps> = ({ isLoading = false }) => {
  const { t } = useTranslation('create-coin-page');
  const { control } = useFormContext<StablecoinFormData>();
  return (
    <VStack className='w-full max-w-xs'>
      <Paragraph size='md' color='dark' className='mb-4 text-center font-medium'>
        Stablecoin creation
      </Paragraph>
      <FormInput
        control={control}
        disabled={isLoading}
        name='name'
        label={t('step-details.step-1.name')}
        placeholder={t('step-details.step-1.name')}
        required
      />
      <FormInput
        control={control}
        disabled={isLoading}
        name='symbol'
        label={t('step-details.step-1.symbol')}
        placeholder={t('step-details.step-1.symbol')}
        required
      />
      <FormInput
        control={control}
        disabled={isLoading}
        name='configId'
        label={t('step-details.step-1.config-id')}
        placeholder={t('step-details.step-1.config-id')}
        required
      />
      <FormInput
        control={control}
        disabled={isLoading}
        name='configVersion'
        label={t('step-details.step-1.config-version')}
        placeholder={t('step-details.step-1.config-version')}
        required
      />
    </VStack>
  );
};

export default CreateCoinStep_1Container;
