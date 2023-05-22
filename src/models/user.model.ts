import mongoose, { Schema, Document, ObjectId } from "mongoose";

require("./comment.model");
require("./post.model");

export interface IUser extends Document {
  _id: ObjectId;
  email: string;
  username: string;
  password: string;
  admin: boolean;
  posts: ObjectId[];
  comments: ObjectId[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model<IUser>("User", UserSchema);
