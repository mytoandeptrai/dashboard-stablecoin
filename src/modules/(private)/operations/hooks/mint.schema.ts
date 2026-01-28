import z from 'zod';

const mintFormSchema = () => {
  return z
    .object({
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
    });
};

type MintFormData = z.infer<ReturnType<typeof mintFormSchema>>;

const defaultMintFormValues: MintFormData = {
  amount: 1,
  memo: '',
};

export { defaultMintFormValues, type MintFormData, mintFormSchema };
