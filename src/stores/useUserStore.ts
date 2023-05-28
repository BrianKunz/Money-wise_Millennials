import { create } from "zustand";
import { userService } from "../services/userService";
import { IUser } from "../models/user.model";

type UserStore = {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  login: (user: IUser) => Promise<void>;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  login: async (user) => {
    try {
      set({ loading: true, error: null });
      const response = await userService.login(user);
      set({ user: response, loading: false });
    } catch (error) {
      set({
        error: (error as Error).message || "An error occurred",
        loading: false,
      });
    }
  },
  logout: () => {
    set({ user: null, loading: false, error: null });
  },
}));
