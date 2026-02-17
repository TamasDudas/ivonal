import { useEffect } from 'react';

type Appearance = 'dark' | 'light' | 'system';

const applyDarkTheme = () => {
 if (typeof document === 'undefined') return;
 document.documentElement.classList.add('dark');
 document.documentElement.style.colorScheme = 'dark';
};

export function initializeTheme() {
 applyDarkTheme();
}

export function useAppearance() {
 useEffect(() => {
  applyDarkTheme();
 }, []);

 const updateAppearance = (_appearance: Appearance) => {
  // Reference the parameter to satisfy the linter; app enforces dark mode.
  void _appearance;
  applyDarkTheme();
 };

 return { appearance: 'dark' as const, updateAppearance };
}
