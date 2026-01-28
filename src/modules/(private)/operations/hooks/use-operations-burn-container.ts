import { useTranslation } from '@/integrations/i18n';
import { useForm } from 'react-hook-form';
import { defaultBurnFormValues, burnFormSchema, type BurnFormData } from './burn.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Route } from '@/routes/(private)/stable-coin/$stablecoinId/operations';

export const useOperationsBurnContainer = () => {
  const { t } = useTranslation();
  const navigate = Route.useNavigate();

  const onBack = () => {
    navigate({
      search: { action: undefined },
      replace: true,
    });
  };

  const form = useForm<BurnFormData>({
    resolver: zodResolver(burnFormSchema()),
    defaultValues: defaultBurnFormValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: BurnFormData) => {
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
