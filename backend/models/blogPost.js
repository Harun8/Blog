import mongoose, { Schema, model } from "mongoose";

const blogPostSchema = new Schema({
  author: { type: String },
  title: { type: String },
  content: { type: String },
  createdAt: { type: Date, default: () => Date.now() },
  img: { type: String },
});

const BlogPost = mongoose.blogPost || model("blogPost", blogPostSchema);

export default BlogPost;
