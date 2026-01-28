import { Paragraph } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import { Show, VStack } from '@/components/utilities';
import { useTranslation } from '@/integrations/i18n';
import type { FCC } from '@/types';
import { useFormContext } from 'react-hook-form';
import type { StablecoinFormData } from '../../hooks';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import CopyButton from '@/components/ui/copy-button';

type CreateCoinStep_5ContainerProps = {
  isLoading?: boolean;
};

type ReviewRowProps = {
  label: string;
  value: string | number | boolean | undefined;
  copyable?: boolean;
};

const ReviewRow = ({ label, value, copyable = false }: ReviewRowProps) => {
  const displayValue = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : (value ?? '-');

  return (
    <div className='flex w-full items-center justify-between border-gray-100 border-b py-2'>
      <span className='text-muted-foreground text-sm'>{label}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='flex items-center'>
            <span className='max-w-36 truncate font-medium text-sm'>{displayValue}</span>
            {copyable && <CopyButton value={value as string} className='ml-2' />}
          </div>
        </TooltipTrigger>
        <Show when={!!value && typeof value === 'string' && value.length > 16}>
          <TooltipContent>
            <p className='text-sm'>{value}</p>
          </TooltipContent>
        </Show>
      </Tooltip>
    </div>
  );
};

const CreateCoinStep_5Container: FCC<CreateCoinStep_5ContainerProps> = () => {
  const { t } = useTranslation('create-coin-page');
  const { getValues } = useFormContext<StablecoinFormData>();
  const values = getValues();

  const getPermissionDisplay = (permission: string, otherKey?: string) => {
    if (permission === 'other-key' && otherKey) {
      return otherKey;
    }
    const permissionLabels: Record<string, string> = {
      'var-meta-smc': 'Var-Meta SMC',
      'current-user-key': 'Current User Key',
      none: 'None',
      'other-key': 'Other Key',
    };
    return permissionLabels[permission] || permission;
  };

  const getRoleDisplay = (role: string, otherAccount?: string) => {
    if (role === 'other-account' && otherAccount) {
      return otherAccount;
    }
    const roleLabels: Record<string, string> = {
      'current-user-account': 'Current user account',
      'other-account': 'Other account',
      none: 'None',
    };
    return roleLabels[role] || role;
  };

  return (
    <VStack className='w-full max-w-lg gap-6'>
      <Paragraph size='md' color='dark' className='mb-2 font-medium'>
        {t('step-details.step-5.title')}
      </Paragraph>

      {/* Stablecoin Details */}
      <VStack className='w-full gap-1'>
        <Paragraph size='sm' color='dark' className='font-semibold'>
          {t('step-details.step-5.stablecoin-details')}
        </Paragraph>
        <ReviewRow label={t('step-details.step-5.hedera-token-manager-impl')} value={values.configId} copyable />
        <ReviewRow label={t('step-details.step-5.stablecoin-name')} value={values.name} />
        <ReviewRow label={t('step-details.step-5.stablecoin-symbol')} value={values.symbol} />
      </VStack>

      <Separator />

      {/* Supply & Metadata */}
      <VStack className='w-full gap-1'>
        <Paragraph size='sm' color='dark' className='font-semibold'>
          {t('step-details.step-5.supply-metadata')}
        </Paragraph>
        <ReviewRow label={t('step-details.step-5.initial-supply')} value={values.initialSupply} />
        <ReviewRow label={t('step-details.step-5.supply-type')} value={values.supplyType} />
        <ReviewRow
          label={t('step-details.step-5.max-supply')}
          value={values.supplyType === 'infinite' ? 'Infinite' : '-'}
        />
        <ReviewRow label={t('step-details.step-5.decimals')} value={values.decimals} />
        <ReviewRow label={t('step-details.step-5.metadata')} value={values.metadata || '-'} />
      </VStack>

      <Separator />

      {/* Permissions */}
      <VStack className='w-full gap-1'>
        <Paragraph size='sm' color='dark' className='font-semibold'>
          {t('step-details.step-5.permissions')}
        </Paragraph>
        <ReviewRow
          label={t('step-details.step-5.wipe')}
          value={getPermissionDisplay(values.wipePermission, values.wipePermissionOtherKey)}
        />
        <ReviewRow
          label={t('step-details.step-5.freeze')}
          value={getPermissionDisplay(values.freezePermission, values.freezePermissionOtherKey)}
        />
        <ReviewRow
          label={t('step-details.step-5.pause')}
          value={getPermissionDisplay(values.pausePermission, values.pausePermissionOtherKey)}
        />
        <ReviewRow label={t('step-details.step-5.kyc')} value={values.kycEnabled} />
        <ReviewRow label={t('step-details.step-5.custom-fees')} value={values.customFees} />
      </VStack>

      <Separator />

      {/* Roles Assignment */}
      <VStack className='w-full gap-1'>
        <Paragraph size='sm' color='dark' className='font-semibold'>
          {t('step-details.step-5.roles-assignment')}
        </Paragraph>
        <ReviewRow
          label={t('step-details.step-5.cash-in')}
          value={getRoleDisplay(values.cashInRole, values.cashInRoleOtherAccount)}
        />
        <ReviewRow label={t('step-details.step-5.unlimited')} value={values.unlimited} />
        <ReviewRow
          label={t('step-details.step-5.burn')}
          value={getRoleDisplay(values.burnRole, values.burnRoleOtherAccount)}
        />
        <ReviewRow
          label={t('step-details.step-5.wipe')}
          value={getRoleDisplay(values.wipeRole, values.wipeRoleOtherAccount)}
        />
        <ReviewRow
          label={t('step-details.step-5.rescue')}
          value={getRoleDisplay(values.rescueRole, values.rescueRoleOtherAccount)}
        />
        <ReviewRow
          label={t('step-details.step-5.pause')}
          value={getRoleDisplay(values.pauseRole, values.pauseRoleOtherAccount)}
        />
        <ReviewRow
          label={t('step-details.step-5.freeze')}
          value={getRoleDisplay(values.freezeRole, values.freezeRoleOtherAccount)}
        />
        <ReviewRow
          label={t('step-details.step-5.delete')}
          value={getRoleDisplay(values.deleteRole, values.deleteRoleOtherAccount)}
        />
      </VStack>

      <Separator />

      {/* Proof-of-Reserve */}
      <VStack className='w-full gap-1'>
        <Paragraph size='sm' color='dark' className='font-semibold'>
          {t('step-details.step-5.proof-of-reserve')}
        </Paragraph>
        <ReviewRow label={t('step-details.step-5.collateralized')} value={values.collateralized} />
        <ReviewRow label={t('step-details.step-5.existing-data-feed')} value={values.existingDataFeed} />
        {values.existingDataFeed ? (
          <ReviewRow label={t('step-details.step-5.data-feed-address')} value={values.dataFeedAddress || '-'} />
        ) : (
          <ReviewRow label={t('step-details.step-5.proof-of-reserve-supply')} value={values.proofOfReserveSupply} />
        )}
      </VStack>
    </VStack>
  );
};

export default CreateCoinStep_5Container;
