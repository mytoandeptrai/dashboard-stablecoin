import { useTranslation } from '@/integrations/i18n';
import { useForm } from 'react-hook-form';
import { defaultMintFormValues, mintFormSchema, type MintFormData } from './mint.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Route } from '@/routes/(private)/stable-coin/$stablecoinId/operations';

export const useOperationsMintContainer = () => {
  const { t } = useTranslation();
  const navigate = Route.useNavigate();

  const onBack = () => {
    navigate({
      search: { action: undefined },
      replace: true,
    });
  };

  const form = useForm<MintFormData>({
    resolver: zodResolver(mintFormSchema()),
    defaultValues: defaultMintFormValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: MintFormData) => {
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
