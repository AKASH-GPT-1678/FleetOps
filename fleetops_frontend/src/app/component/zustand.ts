import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface TokenSetup {
  token: string;
  setToken: (token: string) => void;
}

const useTokenStore = create<TokenSetup>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        setToken: (newToken) => set(() => ({ token: newToken })),
      }),
      { name: 'tokenStore' }
    )
  )
);

export default useTokenStore;
