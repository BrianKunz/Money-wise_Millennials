import { IUser } from "../models/user.model";

const baseURL = "http://localhost:3001/users/";

export const userService = {
  create: async (user: IUser): Promise<IUser> => {
    try {
      console.log("User data: ", user);

      const response = await fetch(`${baseURL}signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to create user.");
      }

      const data = await response.json();

      console.log(data);
      return data;
    } catch (error) {
      console.error("Error signing up: ", error);
      throw error;
    }
  },

  login: async (user: IUser): Promise<IUser> => {
    try {
      const response = await fetch(`${baseURL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error logging in: ", error);
      throw error;
    }
  },
};
