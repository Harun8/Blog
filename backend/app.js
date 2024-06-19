import "colors";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/index.js";
import { resolvers } from "./resolvers/index.js";
import { connectDB } from "./db/db.js";
import { verifyToken } from "./middleware/jwt.js";

const API_PORT = process.env.PORT || 4000;

// const { url } = await startStandaloneServer(server, {
//   context: async ({ req }) => ({ token: req.headers.token }),
//   listen: API_PORT,
// });

const app = express();

const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next();

  if (token != undefined) {
    let tt = JSON.parse(token);

    let isTokenValid = verifyToken(tt.token);
  }

  next(); // Pass control to the next middleware function
});

app.use(
  "/",
  cors(),
  express.json({ limit: "50mb" }),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      return {
        token,
        headers: req.headers,
      };
    },
  })
);

await new Promise((resolve) => httpServer.listen({ port: API_PORT }, resolve));

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
