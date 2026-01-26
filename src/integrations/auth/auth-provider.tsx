import type { IUserInfo } from '@/apis/auth';
import LoadingFluid from '@/components/shared/loading-fluid';
import { ROUTES } from '@/constant';
import { router } from '@/main';
import { useOnboardingStore } from '@/stores/use-onboarding-store';
import { createContext, useContext, type ReactNode } from 'react';
import { toast } from 'sonner';
import { useTranslation } from '../i18n';
import { getContext } from '../tanstack-query/root-provider';
import { useConnection, useDisconnect } from 'wagmi';
import { sleep } from '@/utils';

export type AuthContextState = {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  user?: IUserInfo;
  onRefetch: () => Promise<void>;
  onSignout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation('common');
  const onboardingStore = useOnboardingStore();
  const { queryClient } = getContext();
  const { isConnected } = useConnection();
  const { mutateAsync } = useDisconnect();

  // Get user data from onboarding store
  const userData = onboardingStore.userInfo
    ? {
        id: 'onboarding-user',
        email: onboardingStore.userInfo.email,
        firstName: onboardingStore.userInfo.firstName,
        lastName: onboardingStore.userInfo.lastName,
      }
    : undefined;

  const onRefetch = async () => {
    /** TODO: Implement */
  };

  const onSignout = async () => {
    toast.success(t('messages.signout-success', { ns: 'common' }));
    queryClient.cancelQueries({});
    queryClient.removeQueries({});
    queryClient.clear();
    onboardingStore.reset();
    if (isConnected) {
      await mutateAsync();
    }
    await sleep(300);
    router.navigate({
      to: ROUTES.GETTING_STARTED,
    });
  };

  // User is authenticated if they have accepted terms (from onboarding store)
  const isAuthenticated = onboardingStore.termsAccepted;

  const contextValue: AuthContextState = {
    isAuthenticating: false,
    isAuthenticated,
    user: userData as IUserInfo | undefined,
    onRefetch,
    onSignout,
  };

  if (contextValue.isAuthenticating) {
    return <LoadingFluid />;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
