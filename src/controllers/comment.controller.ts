import express, { Request, Response } from "express";
import Comment from "../models/comment.model";

const commentController = express.Router();

// Get all comments
commentController.get("/", async (res: Response) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// Get a comment by ID
commentController.get("/:id", async (req: Request, res: Response) => {
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
});

// Create new comment
commentController.post("/", async (req: Request, res: Response) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// Update a comment
commentController.put("/:id", async (req: Request, res: Response) => {
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
});

// Delete a comment
commentController.delete("/:id", async (req: Request, res: Response) => {
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
});

export default commentController;
