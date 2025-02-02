import { FullUser } from "@/types";
import { create } from "zustand";

interface UserState {
  user: FullUser | null;
  setUser: (userData: FullUser) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
}));
