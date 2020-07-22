import "./env";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isUserAuthenticated, isAdminAuthenticated } from "./middlewares";
import express from "express";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  name: "Query",
  fields: {
    _dummy: { type: graphql.GraphQLString },
  },
  schema,
  context: ({ request }) => ({
    request,
    isUserAuthenticated,
    isAdminAuthenticated,
  }),
});

server.express.use(logger("dev"));
server.express.use(
  logger(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
