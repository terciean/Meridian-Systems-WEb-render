import { SOLUTION_LIST } from '@/data/solutions';

export interface NavItem {
  label: string;
  to: string;
}

export const NAV_ITEMS: NavItem[] = [
  ...SOLUTION_LIST.map((solution) => ({ label: solution.navLabel, to: solution.path })),
  { label: 'Our Work', to: '/our-work' },
  { label: 'Contact', to: '/contact' },
];

export const ENQUIRE_PATH = '/enquire';
