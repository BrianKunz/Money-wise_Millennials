import { IPost } from "../models/post.model";

const baseURL = "http://localhost:3001/posts/";

export const postService = {
  getAll: async (): Promise<IPost[]> => {
    try {
      const response = await fetch(`${baseURL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get all posts");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting all posts: ", error);
      throw error;
    }
  },

  getOne: async (id: string): Promise<IPost> => {
    try {
      const response = await fetch(`${baseURL}${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get post");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting post: ", error);
      throw error;
    }
  },

  create: async (post: IPost): Promise<IPost> => {
    try {
      console.log("Post data: ", post);

      const response = await fetch(`${baseURL}create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error creating post: ", error);
      throw error;
    }
  },

  update: async (post: IPost, id: string): Promise<IPost> => {
    try {
      console.log("Post data: ", post);

      const response = await fetch(`${baseURL}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating post: ", error);
      throw error;
    }
  },

  delete: async (id: string): Promise<IPost> => {
    try {
      const response = await fetch(`${baseURL}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting post: ", error);
      throw error;
    }
  },
};
