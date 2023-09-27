import Mongoose from "mongoose";

export const connect = async () => {
  const uri = process.env.TEMP_MONGO_URI || "uri";

  try {
    const connection = await Mongoose.connect(uri);
    const database = connection.connection;
    database.once("open", async () => {
      console.log("Connect to database");
    });

    database.on("error", () => {
      console.log("Error connecting to database");
    });
  } catch (error) {
    console.error("Error while connecting to MongoDB", error);
  }
};

export const disconnect = () => {
  Mongoose.disconnect();
};
