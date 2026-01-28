import { ROUTES } from '@/constant';
import type { NavItem } from '@/types';
import type { TFunction } from 'i18next';
import { LayoutDashboardIcon, SettingsIcon, User2Icon } from 'lucide-react';

export const navItems = (t: TFunction): NavItem[] => [
  {
    title: t('labels.operations'),
    url: ROUTES.OPERATIONS,
    icon: LayoutDashboardIcon,
    isActive: false,
    shortcut: ['h', 'h'],
    items: [],
  },
  {
    title: t('labels.settings'),
    url: ROUTES.SETTINGS,
    icon: SettingsIcon,
    shortcut: ['s', 's'],
    isActive: false,
    items: [
      {
        title: t('labels.profile'),
        url: ROUTES.PROFILE,
        icon: User2Icon,
        shortcut: ['p', 'p'],
      },
    ],
  },
];
