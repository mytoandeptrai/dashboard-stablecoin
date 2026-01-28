import { FormInput } from '@/components/form-fields/form-input';
import { FormSelect } from '@/components/form-fields/form-select';
import { FormSwitch } from '@/components/form-fields/form-switch';
import { Show, VStack } from '@/components/utilities';
import { useTranslation } from '@/integrations/i18n';
import type { FCC, Option } from '@/types';
import { useFormContext } from 'react-hook-form';
import { type StablecoinFormData, PERMISSION_OPTIONS, ROLE_OPTIONS, FEE_SCHEDULE_OPTIONS } from '../../hooks';
import { Paragraph } from '@/components/ui/typography';
import { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';

type CreateCoinStep_3ContainerProps = {
  isLoading?: boolean;
  options?: {
    permission: Option<string>[];
    role: Option<string>[];
    feeSchedule: Option<string>[];
  };
};

const CreateCoinStep_3Container: FCC<CreateCoinStep_3ContainerProps> = ({ isLoading = false, options }) => {
  const { t } = useTranslation('create-coin-page');
  const { control, watch, setValue } = useFormContext<StablecoinFormData>();

  const assignDefaultValues = watch('assignDefaultValues');
  const wipePermission = watch('wipePermission');
  const freezePermission = watch('freezePermission');
  const pausePermission = watch('pausePermission');
  const customFees = watch('customFees');
  const feeSchedule = watch('feeSchedule');
  const cashInRole = watch('cashInRole');
  const burnRole = watch('burnRole');
  const wipeRole = watch('wipeRole');
  const rescueRole = watch('rescueRole');
  const pauseRole = watch('pauseRole');
  const freezeRole = watch('freezeRole');
  const deleteRole = watch('deleteRole');

  // When "Assign default values" is toggled ON, set all permissions to "var-meta-smc"
  useEffect(() => {
    if (assignDefaultValues) {
      setValue('wipePermission', PERMISSION_OPTIONS.VAR_META_SMC, { shouldValidate: true });
      setValue('freezePermission', PERMISSION_OPTIONS.VAR_META_SMC, { shouldValidate: true });
      setValue('pausePermission', PERMISSION_OPTIONS.VAR_META_SMC, { shouldValidate: true });
    }
  }, [assignDefaultValues, setValue]);

  return (
    <VStack className='w-full max-w-md gap-4'>
      <Paragraph size='md' color='dark' className='mb-4 text-center font-medium'>
        {t('step-details.step-3.title')}
      </Paragraph>

      {/* Assign Default Values Switch */}
      <FormSwitch
        control={control}
        disabled={isLoading}
        name='assignDefaultValues'
        label={t('step-details.step-3.assign-default-values')}
        className='border-none'
      />

      {/* Wipe Permission */}
      <FormSelect
        control={control}
        disabled={isLoading}
        name='wipePermission'
        label={t('step-details.step-3.wipe')}
        options={options?.permission ?? []}
        selectClassName='h-12! w-full'
      />
      <Show when={wipePermission === PERMISSION_OPTIONS.OTHER_KEY}>
        <FormInput
          control={control}
          disabled={isLoading}
          name='wipePermissionOtherKey'
          placeholder={t('step-details.step-3.other-key-placeholder')}
        />
      </Show>

      {/* Freeze Permission */}
      <FormSelect
        control={control}
        disabled={isLoading}
        name='freezePermission'
        label={t('step-details.step-3.freeze')}
        options={options?.permission ?? []}
        selectClassName='h-12! w-full'
      />
      <Show when={freezePermission === PERMISSION_OPTIONS.OTHER_KEY}>
        <FormInput
          control={control}
          disabled={isLoading}
          name='freezePermissionOtherKey'
          placeholder={t('step-details.step-3.other-key-placeholder')}
        />
      </Show>

      {/* Pause Permission */}
      <FormSelect
        control={control}
        disabled={isLoading}
        name='pausePermission'
        label={t('step-details.step-3.pause')}
        options={options?.permission ?? []}
        selectClassName='h-12! w-full'
      />
      <Show when={pausePermission === PERMISSION_OPTIONS.OTHER_KEY}>
        <FormInput
          control={control}
          disabled={isLoading}
          name='pausePermissionOtherKey'
          placeholder={t('step-details.step-3.other-key-placeholder')}
        />
      </Show>

      {/* KYC Enabled */}
      <FormSwitch
        control={control}
        disabled={isLoading}
        name='kycEnabled'
        label={t('step-details.step-3.kyc-enabled')}
        className='border-none'
      />

      {/* Grant KYC Flag */}
      <FormSwitch
        control={control}
        disabled={isLoading}
        name='grantKycFlag'
        label={t('step-details.step-3.grant-kyc-flag')}
        className='border-none'
      />

      {/* Custom Fees */}
      <FormSwitch
        control={control}
        disabled={isLoading}
        name='customFees'
        label={t('step-details.step-3.custom-fees')}
        className='border-none'
      />
      <Show when={customFees}>
        <FormSelect
          control={control}
          disabled={isLoading}
          name='feeSchedule'
          label={t('step-details.step-3.fee-schedule')}
          options={options?.feeSchedule ?? []}
          selectClassName='h-12! w-full'
        />
        <Show when={feeSchedule === FEE_SCHEDULE_OPTIONS.OTHER_KEY}>
          <FormInput
            control={control}
            disabled={isLoading}
            name='feeScheduleOtherKey'
            placeholder={t('step-details.step-3.other-key-placeholder')}
          />
        </Show>
      </Show>

      <Separator className='my-4' />

      {/* Roles Assignment Section */}
      <Paragraph size='md' color='dark' className='font-medium'>
        {t('step-details.step-3.roles-assignment')}
      </Paragraph>

      {/* Cash In Role */}
      <FormSelect
        control={control}
        disabled={isLoading}
        name='cashInRole'
        label={t('step-details.step-3.cash-in')}
        options={options?.role ?? []}
        selectClassName='h-12! w-full'
      />
      <Show when={cashInRole === ROLE_OPTIONS.OTHER_ACCOUNT}>
        <FormInput
          control={control}
          disabled={isLoading}
          name='cashInRoleOtherAccount'
          placeholder={t('step-details.step-3.other-account-placeholder')}
        />
      </Show>

      {/* Unlimited */}
      <FormSwitch
        control={control}
        disabled={isLoading}
        name='unlimited'
        label={t('step-details.step-3.unlimited')}
        className='border-none'
      />

      {/* Burn Role */}
      <FormSelect
        control={control}
        disabled={isLoading}
        name='burnRole'
        label={t('step-details.step-3.burn')}
        options={options?.role ?? []}
        selectClassName='h-12! w-full'
      />
      <Show when={burnRole === ROLE_OPTIONS.OTHER_ACCOUNT}>
        <FormInput
          control={control}
          disabled={isLoading}
          name='burnRoleOtherAccount'
          placeholder={t('step-details.step-3.other-account-placeholder')}
        />
      </Show>

      {/* Wipe Role */}
      <FormSelect
        control={control}
        disabled={isLoading}
        name='wipeRole'
        label={t('step-details.step-3.wipe-role')}
        options={options?.role ?? []}
        selectClassName='h-12! w-full'
      />
      <Show when={wipeRole === ROLE_OPTIONS.OTHER_ACCOUNT}>
        <FormInput
          control={control}
          disabled={isLoading}
          name='wipeRoleOtherAccount'
          placeholder={t('step-details.step-3.other-account-placeholder')}
        />
      </Show>

      {/* Rescue Role */}
      <FormSelect
        control={control}
        disabled={isLoading}
        name='rescueRole'
        label={t('step-details.step-3.rescue')}
        options={options?.role ?? []}
        selectClassName='h-12! w-full'
      />
      <Show when={rescueRole === ROLE_OPTIONS.OTHER_ACCOUNT}>
        <FormInput
          control={control}
          disabled={isLoading}
          name='rescueRoleOtherAccount'
          placeholder={t('step-details.step-3.other-account-placeholder')}
        />
      </Show>

      {/* Pause Role */}
      <FormSelect
        control={control}
        disabled={isLoading}
        name='pauseRole'
        label={t('step-details.step-3.pause-role')}
        options={options?.role ?? []}
        selectClassName='h-12! w-full'
      />
      <Show when={pauseRole === ROLE_OPTIONS.OTHER_ACCOUNT}>
        <FormInput
          control={control}
          disabled={isLoading}
          name='pauseRoleOtherAccount'
          placeholder={t('step-details.step-3.other-account-placeholder')}
        />
      </Show>

      {/* Freeze Role */}
      <FormSelect
        control={control}
        disabled={isLoading}
        name='freezeRole'
        label={t('step-details.step-3.freeze-role')}
        options={options?.role ?? []}
        selectClassName='h-12! w-full'
      />
      <Show when={freezeRole === ROLE_OPTIONS.OTHER_ACCOUNT}>
        <FormInput
          control={control}
          disabled={isLoading}
          name='freezeRoleOtherAccount'
          placeholder={t('step-details.step-3.other-account-placeholder')}
        />
      </Show>

      {/* Delete Role */}
      <FormSelect
        control={control}
        disabled={isLoading}
        name='deleteRole'
        label={t('step-details.step-3.delete')}
        options={options?.role ?? []}
        selectClassName='h-12! w-full'
      />
      <Show when={deleteRole === ROLE_OPTIONS.OTHER_ACCOUNT}>
        <FormInput
          control={control}
          disabled={isLoading}
          name='deleteRoleOtherAccount'
          placeholder={t('step-details.step-3.other-account-placeholder')}
        />
      </Show>
    </VStack>
  );
};

export default CreateCoinStep_3Container;
