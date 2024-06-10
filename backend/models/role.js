import mongoose, { Schema, model } from "mongoose";

const roleSchema = new Schema({
  name: String,
  slug: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  permissions: {
    type: [
      {
        name: String,
        allowed: [String],
      },
    ],
  },
  created_at: { type: Date, default: () => Date.now() },
});

const Role = mongoose.role || model("role", roleSchema);

export default Role;
