import { isValidEthereumAddress } from '@/utils';
import z from 'zod';

const transferFormSchema = () => {
  return z
    .object({
      address: z.string().min(1, 'Address is required'),
      amount: z.number().min(0, 'Amount must be non-negative'),
      memo: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.amount <= 0) {
        ctx.addIssue({
          code: 'custom',
          message: 'Amount must be greater than 0',
          path: ['amount'],
        });
      }

      if (data.address) {
        if (!isValidEthereumAddress(data.address)) {
          ctx.addIssue({
            code: 'custom',
            path: ['address'],
            message: 'Invalid address format',
          });
        }
      }
    });
};

type TransferFormData = z.infer<ReturnType<typeof transferFormSchema>>;

const defaultTransferFormValues: TransferFormData = {
  amount: 1,
  memo: '',
  address: '',
};

export { defaultTransferFormValues, type TransferFormData, transferFormSchema };
