import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserStore {
  token: string;
  activeCompany: string;
  setToken: (token: string) => void;
  setActiveCompany: (company: string) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        activeCompany: '',
        setToken: (newToken) => set(() => ({ token: newToken })),
        setActiveCompany: (newCompany) => set(() => ({ activeCompany: newCompany })),
      }),
      {
        name: 'userStore', // This is the key in localStorage
      }
    )
  )
);
