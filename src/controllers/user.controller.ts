import express, { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

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
userController.post("/login", (req: Request, res: Response, next) => {
  console.log("Login attempt:", req.body); // Log request body

  passport.authenticate(
    "local",
    (err: Error, user: IUser | false, info?: { message: string }) => {
      if (err) {
        console.error("Authentication error:", err); // Log authentication error
        return res.status(500).json(err);
      }

      console.log("Authentication info:", info); // Log authentication info

      if (!user) {
        return res
          .status(401)
          .json({ message: info ? info.message : "No user found." });
      }

      req.logIn(user, (err) => {
        if (err) {
          console.error("Login error:", err); // Log login error
          return res.status(500).json(err);
        }

        // Generate JWT token
        const secret = process.env.JWT_SECRET || "default-secret";
        const token = jwt.sign({ userId: user._id, admin: user.admin }, secret);

        return res.json({
          message: "Logged in successfully",
          user: { id: user._id, username: user.username },
          token, // return the token in the response
        });
      });

      return;
    }
  )(req, res, next);
});

export default userController;
