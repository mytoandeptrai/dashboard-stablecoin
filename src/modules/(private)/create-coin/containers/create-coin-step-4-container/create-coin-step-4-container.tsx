import { FormInput } from '@/components/form-fields/form-input';
import { FormNumberInput } from '@/components/form-fields/form-number-input';
import { FormSwitch } from '@/components/form-fields/form-switch';
import { Paragraph } from '@/components/ui/typography';
import { Show, VStack } from '@/components/utilities';
import { useTranslation } from '@/integrations/i18n';
import type { FCC } from '@/types';
import { useFormContext } from 'react-hook-form';
import type { StablecoinFormData } from '../../hooks';

type CreateCoinStep_4ContainerProps = {
  isLoading?: boolean;
};

const CreateCoinStep_4Container: FCC<CreateCoinStep_4ContainerProps> = ({ isLoading = false }) => {
  const { t } = useTranslation('create-coin-page');
  const { control, watch } = useFormContext<StablecoinFormData>();

  const existingDataFeed = watch('existingDataFeed');

  return (
    <VStack className='w-full max-w-md gap-4'>
      <Paragraph size='md' color='dark' className='mb-4 text-center font-medium'>
        {t('step-details.step-4.title')}
      </Paragraph>

      {/* Collateralized */}
      <FormSwitch
        control={control}
        disabled={isLoading}
        name='collateralized'
        label={t('step-details.step-4.collateralized')}
        className='border-none'
      />

      {/* Existing Data Feed */}
      <FormSwitch
        control={control}
        disabled={isLoading}
        name='existingDataFeed'
        label={t('step-details.step-4.existing-data-feed')}
        className='border-none'
      />

      {/* Proof-of-Reserve Supply or Data Feed Address based on existingDataFeed */}
      <Show when={!existingDataFeed}>
        <FormNumberInput
          control={control}
          disabled={isLoading}
          name='proofOfReserveSupply'
          label={t('step-details.step-4.proof-of-reserve-supply')}
          placeholder={t('step-details.step-4.proof-of-reserve-supply')}
          className='flex-1'
          required
          decimalScale={0}
          thousandSeparator
        />
      </Show>

      <Show when={existingDataFeed}>
        <FormInput
          control={control}
          disabled={isLoading}
          name='dataFeedAddress'
          label={t('step-details.step-4.data-feed-address')}
          placeholder={t('step-details.step-4.data-feed-address')}
          required
        />
      </Show>
    </VStack>
  );
};

export default CreateCoinStep_4Container;
