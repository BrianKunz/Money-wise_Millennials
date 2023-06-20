import express, { Request, Response } from "express";
import Comment from "../models/comment.model";

const commentController = express.Router();

// Get all comments for a post
commentController.get(
  "/posts/:id/comments",
  async (req: Request, res: Response) => {
    try {
      const postId = req.params.id; // Extract the postId from the route parameter
      const comments = await Comment.find({ post: postId });
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
);

// Get a comment by ID
commentController.get(
  "/posts/:id/comments/:id",
  async (req: Request, res: Response) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment)
        return res.status(404).json({ message: "Comment not found." });
      res.json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
    return;
  }
);

// Create new comment
commentController.post(
  "/posts/:id/comments",
  async (req: Request, res: Response) => {
    try {
      const postId = req.params.id; // Extract the postId from the route parameter
      console.log("Post ID:", postId); // Log the postId
      const comment = new Comment({ ...req.body, postId }); // Assign the postId to the comment
      console.log("Comment:", comment); // Log the comment object
      await comment.save();
      console.log("Comment saved:", comment); // Log the saved comment object
      res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
);

// Update a comment
commentController.put(
  "/posts/:id/comments/:id",
  async (req: Request, res: Response) => {
    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!comment)
        return res.status(404).json({ message: "Comment not found." });
      res.json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
    return;
  }
);

// Delete a comment
commentController.delete(
  "/posts/:id/comments/:id",
  async (req: Request, res: Response) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment)
        return res.status(404).json({ message: "Comment not found." });
      res.status(204).json({ message: "Comment deleted." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
    return;
  }
);

export default commentController;
