import { create } from "zustand";
import { commentService } from "../services/commentService";
import { IPost } from "../models/post.model";
import { IComment } from "../models/comment.model";
import { IUser } from "../models/user.model";

interface CommentStore {
  comments: IComment[];
  user: IUser | null;
  getAllComments: (post: IPost) => Promise<void>;
  createNewComment: (comment: IComment, post: IPost) => Promise<void>;
  deleteComment: (id: string, post: IPost) => Promise<void>;
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: [],
  user: null,
  getAllComments: async (post) => {
    try {
      const comments = await commentService.getAll(post._id.toString());
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
      await commentService.create(post._id.toString(), comment);
      await get().getAllComments(post);
    } catch (error) {
      console.error(error);
    }
  },
  deleteComment: async (id, post) => {
    try {
      await commentService.delete(post._id.toString(), id);
      await get().getAllComments(post);
    } catch (error) {
      console.error(error);
    }
  },
}));
