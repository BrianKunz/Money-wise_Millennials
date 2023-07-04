import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

require("./comment.model");
require("./post.model");

export interface IUser extends Document {
  _id?: Types.ObjectId;
  email?: string;
  username: string;
  password: string;
  token: string;
  admin?: boolean;
  posts?: Types.ObjectId[] | Schema.Types.ObjectId[];
  comments?: Types.ObjectId[] | Schema.Types.ObjectId[];
}

interface IUserWithUser extends IUser {
  user: {
    id: string;
    username: string;
  };
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

UserSchema.pre("save", async function (this: IUser, next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

export default mongoose.model<IUserWithUser>("User", UserSchema);
