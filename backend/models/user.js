import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String },
  password: { type: String },
  createdAt: { type: Date, default: () => Date.now() },
});

const User = mongoose.user || model("user", userSchema);

export default User;
