import { create } from "zustand";
import { Iuser } from "../types";

interface UserState {
  user: Iuser | null;
  setUser: (user: Iuser | null) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
