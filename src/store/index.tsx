import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type StoreSchema = {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
};

const useStore = create(
  subscribeWithSelector<StoreSchema>((set) => ({
    isLogin: false,
    snout: true,
    fur: true,
    setIsLogin: (value: boolean) => set({ isLogin: value }),
  })),
);

export default useStore;
