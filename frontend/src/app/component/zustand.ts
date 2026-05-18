import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserStore {
  token: string;
  activeCompany: string;
  isAuthenticated: boolean;
  active_company_page : string;
  setToken: (token: string) => void;
  setActiveCompany: (company: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setActiveCompanyPage: ( company_state : string ) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        activeCompany: '',
        isAuthenticated: false,
         active_company_page : '',
        setToken: (newToken) => set(() => ({ token: newToken })),
        setActiveCompany: (newCompany) => set(() => ({ activeCompany: newCompany })),
        setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated })),
        setActiveCompanyPage : (company_state) => set(()=> ({ active_company_page : company_state}) )
      }),
      {
        name: 'userStore', // This is the key in localStorage
      }
    )
  )
);
