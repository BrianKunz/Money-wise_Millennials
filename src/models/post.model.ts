import mongoose, { Schema, Document, ObjectId } from "mongoose";

require("./user.model");
require("./comment.model");

export interface IPost extends Document {
  _id: ObjectId;
  title: string;
  body: string;
  image: string;
  user: ObjectId;
  comments: ObjectId[];
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model<IPost>("Post", PostSchema);
