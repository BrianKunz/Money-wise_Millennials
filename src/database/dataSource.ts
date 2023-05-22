import * as Mongoose from "mongoose";

let database: Mongoose.Connection;

export const connect = () => {
  const uri = process.env.MONGO_URI || "default-uri";

  if (database) {
    return;
  }

  Mongoose.connect(uri);

  database = Mongoose.connection;

  database.once("open", async () => {
    console.log("Connect to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
