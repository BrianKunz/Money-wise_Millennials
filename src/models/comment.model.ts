import mongoose, { Schema, Document, ObjectId } from "mongoose";

require("./post.model");
require("./user.model");

export interface IComment extends Document {
  _id: string;
  body: string;
  timestamp: Date;
  user: ObjectId;
  post: ObjectId;
}

const CommentSchema: Schema = new Schema({
  body: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

export default mongoose.model<IComment>("Comment", CommentSchema);
