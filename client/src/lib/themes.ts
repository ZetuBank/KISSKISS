export interface Theme {
  id: string;
  name: string;
  emoji: string;
  primary: string;
  secondary: string;
  isDark?: boolean;
}

export const themes: Theme[] = [
  {
    id: 'light',
    name: 'Light',
    emoji: '☀️',
    primary: '#6366F1',
    secondary: '#10B981',
  },
  {
    id: 'dark',
    name: 'Dark',
    emoji: '🌙',
    primary: '#6366F1',
    secondary: '#10B981',
    isDark: true,
  },
  {
    id: 'ocean',
    name: 'Ocean',
    emoji: '🌊',
    primary: '#0EA5E9',
    secondary: '#06B6D4',
    isDark: true,
  },
  {
    id: 'sunset',
    name: 'Sunset',
    emoji: '🌅',
    primary: '#F59E0B',
    secondary: '#EF4444',
  },
  {
    id: 'forest',
    name: 'Forest',
    emoji: '🌲',
    primary: '#10B981',
    secondary: '#059669',
    isDark: true,
  },
  {
    id: 'purple',
    name: 'Purple',
    emoji: '🔮',
    primary: '#8B5CF6',
    secondary: '#A855F7',
    isDark: true,
  },
];
