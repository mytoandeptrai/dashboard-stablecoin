import { z } from 'zod';

export const userInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

export type UserInfoFormValues = z.infer<typeof userInfoSchema>;

export const defaultUserInfoValues: UserInfoFormValues = {
  firstName: '',
  lastName: '',
  email: '',
};
