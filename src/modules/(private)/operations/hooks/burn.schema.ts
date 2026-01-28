import z from 'zod';

const burnFormSchema = () => {
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

type BurnFormData = z.infer<ReturnType<typeof burnFormSchema>>;

const defaultBurnFormValues: BurnFormData = {
  amount: 1,
  memo: '',
};

export { defaultBurnFormValues, type BurnFormData, burnFormSchema };
