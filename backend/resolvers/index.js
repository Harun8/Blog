import hashing from "../middleware/hashing.js";
import signToken from "../middleware/jwt.js";
import passwordValidation from "../middleware/passwordValidation.js";
import BlogPost from "../models/blogPost.js";
import User from "../models/user.js";

export const resolvers = {
  // returns data, aka get req??
  Query: {
    login: async (parent, args) => {
      const { password, email } = args.input;
      console.log(password, email);

      if (password && email) {
        console.log("finding the user");
        const user = await User.find({
          email,
        });

        console.log("user is", user);
        let hashedPassword = user[0].password;
        let passwordCheck = await passwordValidation(password, hashedPassword);

        console.log("passwordCheck", passwordCheck);
      } else {
        return { err: "information is required" };
      }
    },

    blogPost: async (parent, args) => {
      // Fetch a specific blog post by ID
      const { id } = args;
      console.log(args);
      if (id) {
        const blogPost = await BlogPost.findById(id);
        return blogPost ? [blogPost] : [];
      }

      // If no ID is provided, return all blog posts
      const allPosts = await BlogPost.find({});
      return allPosts;
    },
  },

  // Post, patch + delete req??
  Mutation: {
    createUser: async (parent, args, context, info) => {
      const { password } = args.input;
      const { email } = args.input;

      // console.log("password", password, args);
      if (password) {
        // console.log("got in here");
        let hashedPassword = await hashing(password);
        console.log("hash", hashedPassword);

        const user = await User.create({
          email,
          password: hashedPassword,
          new: true,
        });

        console.log("user", user);
        let token = await signToken(user);

        console.log("token", token);

        return { token, user: { email: user.email } };
      } else {
        return { err: "error creating user" };
      }

      // return {
      //   firstName: args.input.firstName,
      //   lastName: args.input.lastName,
      //   email: args.input.email,
      // };
    },
    createBlogPost: async (parent, args, context, info) => {
      const { author, title, content, img } = args.input;

      const blogPost = await BlogPost.create({
        author,
        title,
        content,
        img,
      });
    },
  },
};
