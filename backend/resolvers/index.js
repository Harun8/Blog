import hashing from "../middleware/hashing.js";
import { signToken } from "../middleware/jwt.js";
import passwordValidation from "../middleware/passwordValidation.js";
import BlogPost from "../models/blogPost.js";
import User from "../models/user.js";
import { GraphQLError } from "graphql";
import Role from "../models/role.js";
import defineGlobalAbilities from "../middleware/abilities.js";
export const resolvers = {
  // returns data, aka get req??
  Query: {
    login: async (parent, args) => {
      const { password, email } = args.input;

      if (password && email) {
        const user = await User.find({
          email,
        });
        let token = await signToken(user);

        let hashedPassword = user[0].password;
        let passwordCheck = await passwordValidation(password, hashedPassword);

        if (passwordCheck) {
          return { token, user: { email: user[0].email, _id: user[0]._id } };
        } else {
          throw new GraphQLError("User err", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }
      } else {
        throw new GraphQLError("User err", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
    },
    abilities: async (parent, args, context, req) => {
      const token = JSON.parse(context.token);
      if (!token) {
        return [{ action: "read", subject: "posts" }];
      }
      const { user } = token;
      let ability = await defineGlobalAbilities(user);

      return ability.rules;
    },

    blogPost: async (parent, args, context) => {
      // Fetch a specific blog post by ID
      const { token } = context;
      const { id } = args;
      if (id) {
        const blogPost = await BlogPost.findById(id);
        return blogPost ? [blogPost] : [];
      } else {
        // If no ID is provided, return all blog posts
        const allPosts = await BlogPost.find({});

        return allPosts;
      }
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

      if (u.length > 0) {
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
      const token = JSON.parse(context.token);
      console.log("context", context);

      console.log("yooo", args);

      const blogPost = await BlogPost.create({
        author,
        title,
        content,
        img,
      });
    },
  },
};
