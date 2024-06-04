import "colors";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/index.js";
import { resolvers } from "./resolvers/index.js";
import { connectDB } from "./db/db.js";

const API_PORT = process.env.API_PORT || 4000;

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: API_PORT,
});

try {
  connectDB();
} catch (error) {
  console.error(error);
}

console.log(`Server is listening to port: `.green, API_PORT);
console.log(
  `Make queries at `.magenta,
  `https://studio.apollographql.com/dev`.yellow
);
