import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useOnboardingStore } from '@/stores/use-onboarding-store';
import { ROUTES } from '@/constant/route.const';
import { useCookiesConsent } from './use-cookies-consent';
import { useUserInfoForm } from './use-user-info-form';

export const useGettingStartedContainer = () => {
  const navigate = useNavigate();
  const isOnboardingComplete = useOnboardingStore((state) => state.isOnboardingComplete);
  const termsAccepted = useOnboardingStore((state) => state.termsAccepted);

  // Check if user has already completed onboarding (terms accepted + user info saved)
  // If so, redirect to dashboard (wallet selection will happen there)
  useEffect(() => {
    if (isOnboardingComplete()) {
      navigate({ to: ROUTES.DASHBOARD });
    }
  }, [isOnboardingComplete, navigate, termsAccepted]);

  // Cookies consent logic
  const cookiesConsent = useCookiesConsent();

  // User info form logic
  const userInfoForm = useUserInfoForm();

  return {
    cookiesConsent,
    userInfoForm,
  };
};
