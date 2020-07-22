require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({
    request,
    isKioskAuthenticated,
    isRiderAuthenticated,
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

server.start({ port: PORT }, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
