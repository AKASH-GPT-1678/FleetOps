import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserStore {
  token: string;
  activeCompany: string;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setActiveCompany: (company: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        activeCompany: '',
        isAuthenticated: false,
        setToken: (newToken) => set(() => ({ token: newToken })),
        setActiveCompany: (newCompany) => set(() => ({ activeCompany: newCompany })),
        setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated })),
      }),
      {
        name: 'userStore', // This is the key in localStorage
      }
    )
  )
);
