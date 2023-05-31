import { IComment } from "../models/comment.model";

const baseURL = "http://localhost:3000/";

export const commentService = {
  getAll: async (postId: string): Promise<IComment[]> => {
    try {
      const response = await fetch(`${baseURL}/post/${postId}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("failed to get comments");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting comments: ", error);
      throw error;
    }
  },

  create: async (postId: string, comment: IComment): Promise<IComment> => {
    try {
      const response = await fetch(
        `${baseURL}/post/${postId}/comments/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error creating comment: ", error);
      throw error;
    }
  },

  delete: async (postId: string, id: string): Promise<IComment> => {
    try {
      const response = await fetch(`${baseURL}/post/${postId}/comments/${id}`, {
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
      console.error("Error deleting comment: ", error);
      throw error;
    }
  },
};
