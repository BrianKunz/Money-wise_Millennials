import dotenv from "dotenv";
dotenv.config();
import { connect } from "./database/dataSource";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import userController from "./controllers/user.controller";
import postController from "./controllers/post.controller";
import commentController from "./controllers/comment.controller";
import passport from "./config/passport";

const PORT = process.env.PORT || 3000;

//Connect to database
connect();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./"));

app.use(
  session({
    secret: process.env.SECRET || "default secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userController);
app.use("/posts", postController);
app.use("/comments", commentController);

app.get("/", (_, res) => {
  res.json({ message: "Service is alive" });
});

app.listen(PORT, () => {
  console.log(`Server is starting on PORT: ${PORT}`);
});
