import Cookies from 'js-cookie';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Cookie keys
const COOKIE_KEYS = {
  TERMS_ACCEPTED: 'termsAccepted',
  COOKIES_ACCEPTED: 'cookiesAccepted',
} as const;

// LocalStorage keys managed by Zustand persist
const STORAGE_KEY = '__onboarding_storage';

// Cookie options - expires in 30 days
const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  expires: 30,
  sameSite: 'lax',
};

export type NetworkType = 'testnet' | 'mainnet';

export type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  acceptedAt: string;
};

export type OnboardingStoreState = {
  // From localStorage (persisted by Zustand)
  userInfo: UserInfo | null;
  selectedNetwork: NetworkType;
  networkSelected: boolean; // true after user confirms network selection

  // Runtime state (read from cookies on init)
  termsAccepted: boolean;
  cookiesAccepted: boolean | null; // null = not answered yet
};

export type OnboardingStoreActions = {
  // Cookie actions
  setTermsAccepted: (accepted: boolean) => void;
  setCookiesAccepted: (accepted: boolean) => void;

  // LocalStorage actions
  setUserInfo: (userInfo: UserInfo) => void;
  setSelectedNetwork: (network: NetworkType) => void;
  setNetworkSelected: (selected: boolean) => void;

  // Utility
  reset: () => void;
  initFromCookies: () => void;

  // Computed
  isOnboardingComplete: () => boolean;
};

export type OnboardingStore = OnboardingStoreState & OnboardingStoreActions;

const DEFAULT_STATE: OnboardingStoreState = {
  userInfo: null,
  selectedNetwork: 'testnet',
  networkSelected: false,
  termsAccepted: false,
  cookiesAccepted: null,
};

// Helper to read cookies
const readCookies = () => ({
  termsAccepted: Cookies.get(COOKIE_KEYS.TERMS_ACCEPTED) === 'true',
  cookiesAccepted: Cookies.get(COOKIE_KEYS.COOKIES_ACCEPTED) === undefined
    ? null
    : Cookies.get(COOKIE_KEYS.COOKIES_ACCEPTED) === 'true',
});

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      // Initialize from cookies on app start
      initFromCookies: () => {
        const cookieState = readCookies();
        set(cookieState);
      },

      setTermsAccepted: (accepted: boolean) => {
        Cookies.set(COOKIE_KEYS.TERMS_ACCEPTED, String(accepted), COOKIE_OPTIONS);
        set({ termsAccepted: accepted });
      },

      setCookiesAccepted: (accepted: boolean) => {
        Cookies.set(COOKIE_KEYS.COOKIES_ACCEPTED, String(accepted), COOKIE_OPTIONS);
        set({ cookiesAccepted: accepted });
      },

      setUserInfo: (userInfo: UserInfo) => {
        set({ userInfo });
      },

      setSelectedNetwork: (network: NetworkType) => {
        set({ selectedNetwork: network });
      },

      setNetworkSelected: (selected: boolean) => {
        set({ networkSelected: selected });
      },

      reset: () => {
        Cookies.remove(COOKIE_KEYS.TERMS_ACCEPTED);
        Cookies.remove(COOKIE_KEYS.COOKIES_ACCEPTED);
        set(DEFAULT_STATE);
      },

      isOnboardingComplete: () => {
        const state = get();
        return state.termsAccepted && state.userInfo !== null;
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields to localStorage
      partialize: (state) => ({
        userInfo: state.userInfo,
        selectedNetwork: state.selectedNetwork,
        networkSelected: state.networkSelected,
      }),
      // After rehydration, read cookies
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.initFromCookies();
        }
      },
    }
  )
);
