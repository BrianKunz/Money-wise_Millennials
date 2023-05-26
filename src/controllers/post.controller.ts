import express, { Request, Response, NextFunction } from "express";
import Post from "../models/post.model";
import { IUser } from "../models/user.model";

const postController = express.Router();

// Admin check middleware
function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && (req.user as IUser).admin) {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
}

// Get all posts
postController.get("/", async (_: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// Get a post by ID
postController.get("/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
  return;
});

// Create new post
postController.post("/", isAdmin, async (req: Request, res: Response) => {
  try {
    const { title, body, image } = req.body;
    const user = (req.user as IUser)._id; // Get the authenticated user's ID
    const post = new Post({ title, body, image, user }); // Create the post with user ID
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// Update a post
postController.put("/:id", isAdmin, async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
  return;
});

// Delete a post
postController.delete("/:id", isAdmin, async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });
    res.status(204).json({ message: "Post deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
  return;
});

export default postController;
