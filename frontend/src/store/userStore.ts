import { create } from "zustand";
import type { User } from "@/types/auth";

interface UserState {
  user: User | null;
  isLoading: boolean;
  isOnboardingComplete: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  checkOnboardingStatus: () => boolean;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: false,
  isOnboardingComplete: false,
  
  setUser: (user) => {
    set({ 
      user,
      isOnboardingComplete: user?.businessProfile !== null && user?.businessProfile !== undefined
    });
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  checkOnboardingStatus: () => {
    const { user } = get();
    return user?.businessProfile !== null && user?.businessProfile !== undefined;
  },
  
  clearUser: () => set({ user: null, isOnboardingComplete: false }),
}));

