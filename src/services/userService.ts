import { IUser } from "../models/user.model";

const baseURL = "http://localhost:3001/users/";

export const userService = {
  create: async (user: IUser): Promise<IUser> => {
    try {
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

      // Store the authentication token in localStorage
      localStorage.setItem("authToken", data.token);

      return data;
    } catch (error) {
      console.error("Error logging in: ", error);
      throw error;
    }
  },

  getUserById: async (userId: string): Promise<IUser> => {
    try {
      const response = await fetch(`${baseURL}${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user by ID.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user by ID: ", error);
      throw error;
    }
  },
};
