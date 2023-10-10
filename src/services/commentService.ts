import { IComment } from "../models/comment.model";
import jwtDecode from "jwt-decode";

// const HOST = process.env.HOSTURL;
// const PORT = process.env.PORTUSED;
const baseURL = `http://${process.env.HOST}:${process.env.PORT}`;

export const commentService = {
  getAll: async (postId: string, authToken?: string): Promise<IComment[]> => {
    try {
      const response = await fetch(
        `${baseURL}/comments/posts/${postId}/comments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken ? `Bearer ${authToken}` : "",
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

  create: async (
    postId: string,
    comment: IComment,
    authToken?: string
  ): Promise<IComment> => {
    try {
      console.log(authToken);
      const decodedToken = jwtDecode(authToken || "");
      console.log("Decoded Token: ", decodedToken);

      const response = await fetch(
        `${baseURL}/comments/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
          body: JSON.stringify(comment),
        }
      );

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

  update: async (
    postId: string,
    commentId: string,
    comment: Partial<IComment>,
    authToken?: string
  ): Promise<IComment> => {
    try {
      const response = await fetch(
        `${baseURL}/comments/posts/${postId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
          body: JSON.stringify(comment),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating comment: ", error);
      throw error;
    }
  },

  delete: async (
    postId: string,
    id: string,
    authToken?: string
  ): Promise<void> => {
    try {
      const response = await fetch(
        `${baseURL}/comments/posts/${postId}/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken ? `Bearer ${authToken}` : "",
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
