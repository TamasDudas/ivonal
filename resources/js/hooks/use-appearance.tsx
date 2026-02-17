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
  // This app enforces dark mode everywhere. Ignore requested value
  // and ensure dark classes/attributes are present.
  applyDarkTheme();
 };

 return { appearance: 'dark' as const, updateAppearance };
}
