import z from 'zod';

// Permission options for Step 3
export const PERMISSION_OPTIONS = {
  VAR_META_SMC: 'var-meta-smc',
  CURRENT_USER_KEY: 'current-user-key',
  NONE: 'none',
  OTHER_KEY: 'other-key',
} as const;

// Role assignment options for Step 3
export const ROLE_OPTIONS = {
  CURRENT_USER_ACCOUNT: 'current-user-account',
  OTHER_ACCOUNT: 'other-account',
  NONE: 'none',
} as const;

// Fee schedule options for Step 3
export const FEE_SCHEDULE_OPTIONS = {
  CURRENT_USER_KEY: 'current-user-key',
  OTHER_KEY: 'other-key',
} as const;

const stablecoinFormSchema = () => {
  return z
    .object({
      // Step 1: Stablecoin Details
      name: z.string().min(1, 'Stablecoin name is required').min(3, 'Name must be at least 3 characters'),
      symbol: z
        .string()
        .min(1, 'Symbol is required')
        .min(2, 'Symbol must be at least 2 characters')
        .max(10, 'Symbol must be at most 10 characters'),
      configId: z
        .string()
        .min(1, 'Config ID is required')
        .regex(/^0x[0-9a-f]+$/i, 'Invalid config ID format'),
      configVersion: z.number().min(1, 'Config version must be at least 1'),

      // Step 2: Supply & Metadata
      initialSupply: z.number().min(0, 'Initial supply must be non-negative'),
      supplyType: z.string(),
      decimals: z.number().min(1, 'Decimals must be non-negative').max(18, 'Decimals must be at most 18'),
      metadata: z.string().optional(),

      // Step 3: Configure Permissions
      assignDefaultValues: z.boolean(),
      // Permission fields (Wipe, Freeze, Pause)
      wipePermission: z.string(),
      wipePermissionOtherKey: z.string().optional(),
      freezePermission: z.string(),
      freezePermissionOtherKey: z.string().optional(),
      pausePermission: z.string(),
      pausePermissionOtherKey: z.string().optional(),
      // KYC settings
      kycEnabled: z.boolean(),
      grantKycFlag: z.boolean(),
      // Custom fees
      customFees: z.boolean(),
      feeSchedule: z.string().optional(),
      feeScheduleOtherKey: z.string().optional(),
      // Roles Assignment
      cashInRole: z.string(),
      cashInRoleOtherAccount: z.string().optional(),
      unlimited: z.boolean(),
      burnRole: z.string(),
      burnRoleOtherAccount: z.string().optional(),
      wipeRole: z.string(),
      wipeRoleOtherAccount: z.string().optional(),
      rescueRole: z.string(),
      rescueRoleOtherAccount: z.string().optional(),
      pauseRole: z.string(),
      pauseRoleOtherAccount: z.string().optional(),
      freezeRole: z.string(),
      freezeRoleOtherAccount: z.string().optional(),
      deleteRole: z.string(),
      deleteRoleOtherAccount: z.string().optional(),

      // Step 4: Proof-of-Reserve
      collateralized: z.boolean(),
      existingDataFeed: z.boolean(),
      proofOfReserveSupply: z.number().min(0, 'Proof-of-reserve supply must be non-negative'),
      dataFeedAddress: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      // Step 2: Validate initial supply is greater than 0
      if (data.initialSupply <= 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'Initial supply must be greater than 0',
          path: ['initialSupply'],
        });
      }

      // Step 4: Validate proof of reserve supply is greater than 0
      if (data.proofOfReserveSupply <= 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'Proof of reserve supply must be greater than 0',
          path: ['proofOfReserveSupply'],
        });
      }
    });
};

type StablecoinFormData = z.infer<ReturnType<typeof stablecoinFormSchema>>;

const defaultFormValues: StablecoinFormData = {
  // Step 1
  name: 'VAR2026SB',
  symbol: 'VAR2026',
  configId: '0x00000000000000000000000000000000000000000000000000000002',
  configVersion: 1,
  // Step 2
  initialSupply: 10,
  supplyType: 'infinite',
  decimals: 6,
  metadata: 'VAR2026metadata',
  // Step 3: Configure Permissions
  assignDefaultValues: false,
  wipePermission: PERMISSION_OPTIONS.NONE,
  wipePermissionOtherKey: '',
  freezePermission: PERMISSION_OPTIONS.NONE,
  freezePermissionOtherKey: '',
  pausePermission: PERMISSION_OPTIONS.NONE,
  pausePermissionOtherKey: '',
  kycEnabled: true,
  grantKycFlag: true,
  customFees: false,
  feeSchedule: FEE_SCHEDULE_OPTIONS.CURRENT_USER_KEY,
  feeScheduleOtherKey: '',
  // Roles Assignment
  cashInRole: ROLE_OPTIONS.CURRENT_USER_ACCOUNT,
  cashInRoleOtherAccount: '',
  unlimited: true,
  burnRole: ROLE_OPTIONS.CURRENT_USER_ACCOUNT,
  burnRoleOtherAccount: '',
  wipeRole: ROLE_OPTIONS.CURRENT_USER_ACCOUNT,
  wipeRoleOtherAccount: '',
  rescueRole: ROLE_OPTIONS.CURRENT_USER_ACCOUNT,
  rescueRoleOtherAccount: '',
  pauseRole: ROLE_OPTIONS.CURRENT_USER_ACCOUNT,
  pauseRoleOtherAccount: '',
  freezeRole: ROLE_OPTIONS.CURRENT_USER_ACCOUNT,
  freezeRoleOtherAccount: '',
  deleteRole: ROLE_OPTIONS.CURRENT_USER_ACCOUNT,
  deleteRoleOtherAccount: '',
  // Step 4: Proof-of-Reserve
  collateralized: false,
  existingDataFeed: false,
  proofOfReserveSupply: 100,
  dataFeedAddress: '',
};

export { defaultFormValues, type StablecoinFormData, stablecoinFormSchema };
