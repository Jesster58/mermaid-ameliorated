import { setMode } from 'mode-watcher';
import { persisted } from './persist.svelte';

export interface Theme {
  id: string;
  label: string;
  dark: boolean;
}

export const themes: Theme[] = [
  { id: 'light', label: 'Light', dark: false },
  { id: 'dark', label: 'Dark', dark: true },
  { id: 'obsidian', label: 'Obsidian', dark: true },
  { id: 'deep-black', label: 'Deep Black', dark: true },
  { id: 'mono-industrial', label: 'Mono Industrial', dark: true }
];

const stored = persisted<{ themeId: string }>('theme', { themeId: 'dark' });

const findTheme = (id: string): Theme => themes.find((t) => t.id === id) ?? themes[1];

export const getTheme = (): Theme => findTheme(stored.value.themeId);

export const getThemeId = (): string => stored.value.themeId;

const applyTheme = (id: string) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-theme', id);
  const theme = findTheme(id);
  root.classList.toggle('dark', theme.dark);
};

export const setTheme = (id: string): void => {
  const theme = findTheme(id);
  stored.value = { themeId: id };
  applyTheme(id);
  setMode(theme.dark ? 'dark' : 'light');
};

export const cycleTheme = (): void => {
  const idx = themes.findIndex((t) => t.id === stored.value.themeId);
  const next = (idx + 1) % themes.length;
  setTheme(themes[next].id);
};

export const initTheme = (): void => {
  const id = stored.value.themeId;
  applyTheme(id);
  const theme = findTheme(id);
  setMode(theme.dark ? 'dark' : 'light');
};
