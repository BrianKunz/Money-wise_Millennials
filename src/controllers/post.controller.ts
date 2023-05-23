import express, { Request, Response } from "express";
import Post from "../models/post.model";

const postController = express.Router();

// Get all posts
postController.get("/", async (res: Response) => {
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
postController.post("/", async (req: Request, res: Response) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// Update a post
postController.put("/:id", async (req: Request, res: Response) => {
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
postController.delete("/:id", async (req: Request, res: Response) => {
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
