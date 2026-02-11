import { useEffect } from 'react';

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

 return { appearance: 'dark' as const };
}
