import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const themeStore = (set) => ({
    theme: 'dark',
    setTheme: (theme) => set((state) => ({ ...state, theme })),
});

const ThemeStore = create(
    devtools(
        persist(themeStore, {
            name: 'themeState',
        }),
    ),
);

export default ThemeStore;
