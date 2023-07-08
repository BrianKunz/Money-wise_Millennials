import { create } from "zustand";
import { commentService } from "../services/commentService";
import { IPost } from "../models/post.model";
import { IComment } from "../models/comment.model";
import { IUser } from "../models/user.model";

interface CommentStore {
  comments: IComment[];
  user: IUser | null;
  getAllComments: (post: IPost, authToken: string) => Promise<void>;
  createNewComment: (
    comment: IComment,
    post: IPost,
    authToken: string
  ) => Promise<void>;
  updateComment: (
    id: string,
    comment: IComment,
    post: IPost,
    authToken: string
  ) => Promise<void>;
  deleteComment: (id: string, post: IPost, authToken: string) => Promise<void>;
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: [],
  user: null,
  getAllComments: async (post) => {
    try {
      const authToken = localStorage.getItem("authToken") || "";
      const comments = await commentService.getAll(
        post._id.toString(),
        authToken
      );
      set({ comments });
    } catch (error) {
      console.error(error);
    }
  },
  createNewComment: async (comment, post) => {
    try {
      const { user } = get();
      if (user) {
        comment.user = user;
      }
      const authToken = localStorage.getItem("authToken") || "";
      await commentService.create(post._id.toString(), comment, authToken);
      await get().getAllComments(post, authToken);
    } catch (error) {
      console.error(error);
    }
  },

  updateComment: async (id, comment, post) => {
    try {
      const authToken = localStorage.getItem("authToken") || "";
      await commentService.update(post._id.toString(), id, comment, authToken);
      await get().getAllComments(post, authToken);
    } catch (error) {
      console.error(error);
    }
  },

  deleteComment: async (id, post) => {
    try {
      const authToken = localStorage.getItem("authToken") || "";
      await commentService.delete(post._id.toString(), id);
      await get().getAllComments(post, authToken);
    } catch (error) {
      console.error(error);
    }
  },
}));
