import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";

const userController = express.Router();

// Get all users
userController.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error, request: req.url });
  }
});

// Get user by ID
userController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error, request: req.url });
  }
  return;
});

// Create user
userController.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password, admin } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with that email already exists." });
    }

    const user: IUser = new User({ email, username, password, admin });
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  return;
});

// Login user
userController.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const secret = process.env.SECRET || "default-secret";
    const token = jwt.sign({ userId: user._id, admin: user.admin }, secret);

    return res.json({
      message: "Logged in successfully",
      user: { id: user._id, username: user.username },
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Login failed" });
  }
});

export default userController;
