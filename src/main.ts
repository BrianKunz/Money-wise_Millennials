import dotenv from "dotenv";
dotenv.config();
require("./database/dataSource");
import express from "express";
import morgan from "morgan";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("./"));

app.get("/", (_, res) => {
  res.json({ message: "Service is alive" });
});

app.listen(PORT, () => {
  console.log(`Server is starting on PORT: ${PORT}`);
});
