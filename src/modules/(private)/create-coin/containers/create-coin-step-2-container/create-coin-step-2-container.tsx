import { FormNumberInput } from '@/components/form-fields/form-number-input';
import { FormSelect } from '@/components/form-fields/form-select';
import { FormTextarea } from '@/components/form-fields/form-textarea';
import { VStack } from '@/components/utilities';
import { useTranslation } from '@/integrations/i18n';
import type { FCC, Option } from '@/types';
import { useFormContext } from 'react-hook-form';
import type { StablecoinFormData } from '../../hooks';
import { Paragraph } from '@/components/ui/typography';

type CreateCoinStep_2ContainerProps = {
  isLoading?: boolean;
  options?: Option<string>[];
};

const CreateCoinStep_2Container: FCC<CreateCoinStep_2ContainerProps> = ({ isLoading = false, options = [] }) => {
  const { t } = useTranslation('create-coin-page');
  const { control } = useFormContext<StablecoinFormData>();
  return (
    <VStack className='w-full max-w-xs'>
      <Paragraph size='md' color='dark' className='mb-4 text-center font-medium'>
        Configure Supply & Metadata
      </Paragraph>
      <FormNumberInput
        control={control}
        disabled={isLoading}
        name='initialSupply'
        label={t('step-details.step-2.initial-supply')}
        placeholder={t('step-details.step-2.initial-supply')}
        className='flex-1'
        required
        decimalScale={2}
        thousandSeparator
      />
      <FormSelect
        control={control}
        disabled={isLoading}
        name='supplyType'
        label={t('step-details.step-2.supply-type')}
        options={options}
        required
        selectClassName='h-12! w-full'
      />
      <FormNumberInput
        control={control}
        disabled={isLoading}
        name='decimals'
        label={t('step-details.step-2.decimals')}
        placeholder={t('step-details.step-2.decimals')}
        className='flex-1'
        required
        decimalScale={0}
        thousandSeparator={false}
      />
      <FormTextarea
        control={control}
        disabled={isLoading}
        name='metadata'
        label={t('step-details.step-2.metadata')}
        placeholder={t('step-details.step-2.metadata')}
        config={{
          rows: 4,
        }}
        required
      />
    </VStack>
  );
};

export default CreateCoinStep_2Container;
