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
import cors from "cors";

//Set HOST and PORT
const HOST = process.env.HOSTURL || "0.0.0.0";
// const HOST = "0.0.0.0";
// const PORT = parseInt(process.env.PORTUSED || "8080", 10);
const PORT = process.env.PORTUSED;

console.log(`Using HOST: ${HOST}`);

//Connect to database
connect();

const app = express();

app.use(cors());
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
app.use("/comments", commentController);
app.use("/posts", postController);

app.get("/", (_, res) => {
  res.json({ message: "Service is alive" });
});

app.get("/", (req, res) => {
  // listen for the 'close' event on the request
  req.on("close", () => {
    console.log("closed connection");
  });

  if (res.socket) {
    console.log(res.socket.destroyed); // true if socket is closed
  }
});

app.listen(HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server is running on:${PORT}`);
// });
