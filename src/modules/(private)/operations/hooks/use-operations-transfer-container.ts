import { useTranslation } from '@/integrations/i18n';
import { useForm } from 'react-hook-form';
import { defaultTransferFormValues, transferFormSchema, type TransferFormData } from './transfer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Route } from '@/routes/(private)/stable-coin/$stablecoinId/operations';

export const useOperationsTransferContainer = () => {
  const { t } = useTranslation();
  const navigate = Route.useNavigate();

  const onBack = () => {
    navigate({
      search: { action: undefined },
      replace: true,
    });
  };

  const form = useForm<TransferFormData>({
    resolver: zodResolver(transferFormSchema()),
    defaultValues: defaultTransferFormValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: TransferFormData) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
  };

  return {
    t,
    form,
    isLoading: false,
    onBack,
    onSubmit,
  };
};
