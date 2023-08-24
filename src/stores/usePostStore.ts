import { create } from "zustand";
import { postService } from "../services/postService";
import { IUser } from "../models/user.model";
import { IPost } from "../models/post.model";

interface PostStore {
  posts: IPost[];
  user: IUser | null;
  post?: IPost;
  getAllPosts: () => Promise<void>;
  getOnePost: (id: string) => Promise<void | IPost>;
  createNewPost: (post: IPost) => Promise<void>;
  updatePost: (post: IPost, authToken: string) => Promise<void>;
  deletePost: (id: string, authToken: string) => Promise<void>;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  user: null,
  getAllPosts: async () => {
    try {
      const posts = await postService.getAll();
      set({ posts });
    } catch (error) {
      console.error(error);
    }
  },
  getOnePost: async (id) => {
    try {
      const post = await postService.getOne(id);
      set({ post });
    } catch (error) {
      console.error(error);
      return undefined;
    }
    return;
  },
  createNewPost: async (post) => {
    try {
      const { user } = get();
      if (user) {
        post.user = user;
      }
      await postService.create(post);
      await get().getAllPosts();
    } catch (error) {
      console.error(error);
    }
  },

  updatePost: async (post) => {
    try {
      console.log("Post before update:", post);
      const authToken = sessionStorage.getItem("authToken") || "";
      console.log(post._id);
      await postService.update(post._id.toString(), post, authToken);
      await get().getAllPosts();
    } catch (error) {
      console.error(error);
    }
  },

  deletePost: async (id) => {
    try {
      await postService.delete(id);
      await get().getAllPosts();
    } catch (error) {
      console.error(error);
    }
  },
}));
