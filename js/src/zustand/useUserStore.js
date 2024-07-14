import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      isLogin: false,
      profileImage: null,
      name: null,
      token: null,
      id: null,
      setIsLogin: (loginState) => set(() => ({ isLogin: loginState })),
      setProfileImage: (path) =>
        set(() => ({ profileImage: 'https://api.fesp.shop' + path })),
      setName: (name) => set(() => ({ name })),
      setToken: (token) => set(() => ({ token })),
      setId: (id) => set(() => ({ id })),
      clearStore: () => {
        sessionStorage.removeItem('user-storage');
        set({
          isLogin: false,
          profileImage: null,
          name: null,
          token: null,
          id: null,
        });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
