import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useOnboardingStore } from '@/stores/use-onboarding-store';
import { ROUTES } from '@/constant/route.const';
import { defaultUserInfoValues, userInfoSchema, type UserInfoFormValues } from './schema';

export const useUserInfoForm = () => {
  const navigate = useNavigate();
  const termsAccepted = useOnboardingStore((state) => state.termsAccepted);
  const setTermsAccepted = useOnboardingStore((state) => state.setTermsAccepted);
  const setUserInfo = useOnboardingStore((state) => state.setUserInfo);
  const cookiesAccepted = useOnboardingStore((state) => state.cookiesAccepted);

  // Show dialog if cookies consent has been answered but terms not accepted
  const showUserInfoDialog = cookiesAccepted !== null && !termsAccepted;

  const form = useForm<UserInfoFormValues>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: defaultUserInfoValues,
    mode: 'onChange',
  });

  const { isValid, isSubmitting } = form.formState;

  const handleSubmit = useCallback(
    async (values: UserInfoFormValues) => {
      // Save user info to localStorage
      setUserInfo({
        ...values,
        acceptedAt: new Date().toISOString(),
      });

      // Set terms accepted cookie
      setTermsAccepted(true);

      // Navigate to dashboard
      navigate({ to: ROUTES.DASHBOARD });
    },
    [setUserInfo, setTermsAccepted, navigate]
  );

  const handleCancel = useCallback(() => {
    // Just close dialog - user can try again
    // We don't set termsAccepted to false here
  }, []);

  return {
    form,
    showUserInfoDialog,
    isValid,
    isSubmitting,
    handleSubmit,
    handleCancel,
  };
};
