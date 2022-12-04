import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const globalStore = (set) => ({
    loading: false,
    setLoading: (loading) => set((state) => ({ ...state, loading: loading })),
    user: null,
    setUser: (user) => set((state) => ({ ...state, user: user })),
    token: null,
    setToken: (token) => set((state) => ({ ...state, token: token })),
    isAuthenticated: () => !!globalStore.getState().user,
    reset: () => set((state) => ({ ...state, user: null, token: null })),
});

const GlobalStore = create(
    devtools(
        persist(globalStore, {
            name: 'globalStore',
        }),
    ),
);

export default GlobalStore;
