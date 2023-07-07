import { IComment } from "../models/comment.model";

const baseURL = "http://localhost:3001";

const authToken = localStorage.getItem("authToken");

export const commentService = {
  getAll: async (postId: string): Promise<IComment[]> => {
    try {
      const response = await fetch(
        `${baseURL}/comments/posts/${postId}/comments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get comments");
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
      console.log(authToken);
      const response = await fetch(
        `${baseURL}/comments/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken}`, // Pass the JWT token in the "Authorization" header
          },
          body: JSON.stringify(comment),
        }
      );
      console.log("Authorization token: ", authToken);

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating comment: ", error);
      throw error;
    }
  },

  delete: async (postId: string, id: string): Promise<void> => {
    try {
      const response = await fetch(
        `${baseURL}/comments/posts/${postId}/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting comment: ", error);
      throw error;
    }
  },
};
