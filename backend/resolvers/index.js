import BlogPost from "../models/blogPost.js";

export const resolvers = {
  // returns data, aka get req??
  Query: {
    apiStatus: () => {
      return { status: "The API is working " };
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
    createUser: (parent, args, context, info) => {
      return {
        firstName: args.input.firstName,
        lastName: args.input.lastName,
        email: args.input.email,
      };
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
