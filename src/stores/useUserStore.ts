import { create } from "zustand";
import { userService } from "../services/userService";
import { IUser } from "../models/user.model";

type UserStore = {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  login: (user: IUser) => Promise<void>;
  logout: () => void;
  createUser: (user: IUser) => Promise<void>;
  getUserById: (userId: string) => Promise<IUser | undefined>;
  users: { [key: string]: IUser };
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
  createUser: async (user) => {
    try {
      await userService.create(user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getUserById: async (userId) => {
    try {
      const user = await userService.getUserById(userId);
      if (user) {
        set((state) => ({
          users: { ...state.users, [user._id || ""]: user },
        }));
      }
      return user;
    } catch (error) {
      console.error("Error fetching user by ID: ", error);
      throw error;
    }
  },
  users: {},
}));
