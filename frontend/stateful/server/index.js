const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app:server");
const { auth, requiresAuth } = require("express-openid-connect");
const { join } = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const jose = require("jose");
const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");

require("dotenv").config();

const app = express();

// Middleware
app.use(helmet());

// Set up a request logger for Express, sending the
// output to `debug()`
app.use(morgan("dev", { stream: { write: (m) => debug(m) } }));

// Initialize Redis client
let redisClient = createClient({
  url: `rediss://${process.env.REDIS_HOST}:6380`,
  password: process.env.REDIS_PASSWORD,
});
redisClient.connect().catch(console.error);

// Initialize Redis store
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "auth0-client:",
});

// Set up authentication middleware, only strictly required if
// the request isn't for the home page
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    authorizationParams: {
      response_type: "code",
      audience: process.env.AUDIENCE,
      scope: "openid profile email read:message",
    },
    session: {
      store: redisStore,
    },
    afterCallback: (req, res, session, state) => {
      // Validate claims
      const claims = jose.decodeJwt(session.id_token); // using jose library to decode JWT
      console.log(claims);
      if (
        claims.iss !== `${process.env.ISSUER_BASE_URL}/` ||
        claims.aud !== process.env.CLIENT_ID
      ) {
        throw new Error("User is not a part of the Required Organization");
      }
      return session;
    },
  })
);

// Proxy API requests to the backend server
const apiProxy = createProxyMiddleware({
  logLevel: "debug",
  target: process.env.AUDIENCE,
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    const { access_token } = req.oidc.accessToken;
    proxyReq.setHeader("Authorization", `Bearer ${access_token}`);
    console.log(`Proxying request to ${proxyReq}`);
  },
});
app.use("/api", apiProxy);

// Serve static files from the /dist folder
app.use(express.static(join(__dirname, "..", "dist")));

// Error handler
app.use((err, req, res, next) => {
  debug(err);
  res.redirect(
    `/error?error=${err.error}&error_description=${err.error_description}`
  );
  console.log(err);
});

// Endpoint for checkling auth status from SPA
app.get("/auth", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.send(req.oidc.user);
  } else {
    res.sendStatus(401);
  }
});

// Error page route
app.get("/error", (req, res) => {
  res.sendFile(join(__dirname, "..", "dist", "index.html"));
});

// Serve the index file in response to any other request
// that doesn't match a static file or the API
app.get("*", requiresAuth(), (req, res) => {
  res.sendFile(join(__dirname, "..", "dist", "index.html"));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Application listening on port ${port}`));
