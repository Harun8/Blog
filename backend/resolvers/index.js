import hashing from "../middleware/hashing.js";
import { signToken } from "../middleware/jwt.js";
import passwordValidation from "../middleware/passwordValidation.js";
import BlogPost from "../models/blogPost.js";
import User from "../models/user.js";
import { GraphQLError } from "graphql";
import Role from "../models/role.js";
export const resolvers = {
  // returns data, aka get req??
  Query: {
    login: async (parent, args) => {
      const { password, email } = args.input;

      if (password && email) {
        const user = await User.find({
          email,
        });

        let hashedPassword = user[0].password;
        let passwordCheck = await passwordValidation(password, hashedPassword);
      } else {
        return { err: "information is required" };
      }
    },

    blogPost: async (parent, args, context) => {
      // Fetch a specific blog post by ID
      const { token } = context;
      const { id } = args;
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

      const u = await User.find({
        email: email,
      });

      console.log("user", u);
      if (u.length > 0) {
        console.log("ABORT user already exists!!!");
        throw new GraphQLError("User already exists", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (password) {
        let hashedPassword = await hashing(password);

        const user = await User.create({
          email,
          password: hashedPassword,
          new: true,
        });

        let token = await signToken(user);
        const role = await Role.findOneAndUpdate(
          {
            name: "User",
          },
          {
            $addToSet: {
              members: user._id,
            },
          },
          {
            new: true,
          }
        );
        console.log("role", role);

        return { token, user: { email: user.email, _id: user._id } };
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
