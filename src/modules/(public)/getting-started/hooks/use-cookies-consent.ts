import { useCallback } from 'react';
import { useOnboardingStore } from '@/stores/use-onboarding-store';

export const useCookiesConsent = () => {
  const cookiesAccepted = useOnboardingStore((state) => state.cookiesAccepted);
  const setCookiesAccepted = useOnboardingStore((state) => state.setCookiesAccepted);

  // Show dialog if cookies consent hasn't been answered yet
  const showCookiesDialog = cookiesAccepted === null;

  const handleAccept = useCallback(() => {
    setCookiesAccepted(true);
  }, [setCookiesAccepted]);

  const handleDecline = useCallback(() => {
    setCookiesAccepted(false);
  }, [setCookiesAccepted]);

  return {
    showCookiesDialog,
    cookiesAccepted,
    handleAccept,
    handleDecline,
  };
};
