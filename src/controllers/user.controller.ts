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
  passport.authenticate(
    "local",
    (err: Error, user: IUser | false, info?: { message: string }) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      if (!user || !info) {
        return res
          .status(401)
          .json({ message: info ? info.message : "No user found." });
      }

      req.logIn(user, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }

        // Generate JWT token
        const secret = process.env.JWT_SECRET || "default-secret";
        const token = jwt.sign({ userId: user._id }, secret);

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
