import express, { Request, Response } from "express";
import Comment from "../models/comment.model";
import { IUser } from "../models/user.model";
import passport from "passport";

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
  "/posts/:postId/comments/:commentId",
  async (req: Request, res: Response) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
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
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    try {
      const postId = req.params.id; // Extract the postId from the route parameter
      const user = req.user as IUser; // Assuming you're using middleware to populate the user in the request object
      console.log(req.user), console.log("Authenticated User:", user);
      if (!user) {
        return res.status(401).json({ message: "User not authenticated." });
      }

      console.log("Request body: ", req.body);

      const comment = new Comment({
        ...req.body,
        user: user._id,
        post: postId,
      });
      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
    return;
  }
);

// Update a comment
commentController.put(
  "/posts/:postId/comments/:commentId",
  async (req: Request, res: Response) => {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        req.body,
        { new: true }
      );
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
  "/posts/:postId/comments/:commentId",
  async (req: Request, res: Response) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.commentId);
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
