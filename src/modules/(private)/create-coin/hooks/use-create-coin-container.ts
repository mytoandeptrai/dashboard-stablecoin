import { useTranslation } from '@/integrations/i18n';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  defaultFormValues,
  type StablecoinFormData,
  PERMISSION_OPTIONS,
  ROLE_OPTIONS,
  FEE_SCHEDULE_OPTIONS,
  stablecoinFormSchema,
} from './schema';
import type { TFunction } from 'i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { setLocalStorageItem } from '@/utils/storage';
import { v4 as uuidv4 } from 'uuid';

const steps = [
  { label: 'steps.1', value: 1 },
  { label: 'steps.2', value: 2 },
  { label: 'steps.3', value: 3 },
  { label: 'steps.4', value: 4 },
  { label: 'steps.5', value: 5 },
];

const SUPPLY_TYPE_OPTIONS = (t: TFunction) => [
  { label: t('options.supply-type.infinite'), value: 'infinite' },
  { label: t('options.supply-type.finite'), value: 'finite' },
];

const PERMISSION_OPTIONS_LIST = (t: TFunction) => [
  { label: t('options.permission.var-meta-smc'), value: PERMISSION_OPTIONS.VAR_META_SMC },
  { label: t('options.permission.current-user-key'), value: PERMISSION_OPTIONS.CURRENT_USER_KEY },
  { label: t('options.permission.none'), value: PERMISSION_OPTIONS.NONE },
  { label: t('options.permission.other-key'), value: PERMISSION_OPTIONS.OTHER_KEY },
];

const ROLE_OPTIONS_LIST = (t: TFunction) => [
  { label: t('options.role.current-user-account'), value: ROLE_OPTIONS.CURRENT_USER_ACCOUNT },
  { label: t('options.role.other-account'), value: ROLE_OPTIONS.OTHER_ACCOUNT },
  { label: t('options.role.none'), value: ROLE_OPTIONS.NONE },
];

const FEE_SCHEDULE_OPTIONS_LIST = (t: TFunction) => [
  { label: t('options.fee-schedule.current-user-key'), value: FEE_SCHEDULE_OPTIONS.CURRENT_USER_KEY },
  { label: t('options.fee-schedule.other-key'), value: FEE_SCHEDULE_OPTIONS.OTHER_KEY },
];

export const useCreateCoinContainer = () => {
  const { t } = useTranslation('create-coin-page');
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<StablecoinFormData>({
    resolver: zodResolver(stablecoinFormSchema()),
    defaultValues: defaultFormValues,
    mode: 'onChange',
  });

  const options = useMemo(() => {
    return {
      supplyType: SUPPLY_TYPE_OPTIONS(t),
      permission: PERMISSION_OPTIONS_LIST(t),
      role: ROLE_OPTIONS_LIST(t),
      feeSchedule: FEE_SCHEDULE_OPTIONS_LIST(t),
    };
  }, [t]);

  const onSubmit = async (data: StablecoinFormData) => {
    const TOKEN_LIST_KEY = 'token-list';
    try {
      const payload = {
        ...data,
        id: uuidv4(),
      };
      const existingTokens = localStorage.getItem(TOKEN_LIST_KEY);
      const tokens: StablecoinFormData[] = existingTokens ? JSON.parse(existingTokens) : [];
      /** Check duplicate name and symbol */
      const isDuplicate = tokens.some((token) => token.name === data.name || token.symbol === data.symbol);
      if (isDuplicate) {
        toast.error('Name or symbol already exists');
        return;
      }

      tokens.push(payload);
      setLocalStorageItem(TOKEN_LIST_KEY, JSON.stringify(tokens));
      form.reset(defaultFormValues);
      setCurrentStep(1);
      toast.success('Create stable coin successfully');
    } catch (error) {
      console.error('Failed to create stable coin:', error);
      toast.error('Failed to create stable coin');
    }
  };

  const onClickNext = () => {
    if (currentStep === steps.length) {
      form.handleSubmit(onSubmit)();
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const onClickBack = () => {
    if (currentStep === 1) {
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  return {
    t,
    currentStep,
    steps,
    form,
    options,
    setCurrentStep,
    onClickNext,
    onClickBack,
    onSubmit,
  };
};
