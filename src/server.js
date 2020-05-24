const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const finale = require("finale-rest");
const OktaJwtVerifier = require("@okta/jwt-verifier");

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: "0oad15qvxa4L2Gnfj4x6",
  issuer: "https://dev-962752.okta.com/oauth2/default"
});

let app = express();
app.use(cors());
app.use(bodyParser.json());

// verify JWT token middleware
app.use((req, res, next) => {
  // require every request to have an authorization header
  if (!req.headers.authorization) {
    return next(new Error("Authorization header is required"));
  }
  let parts = req.headers.authorization.trim().split(" ");
  let accessToken = parts.pop();
  oktaJwtVerifier
    .verifyAccessToken(accessToken)
    .then(jwt => {
      req.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      };
      next();
    })
    .catch(next); // jwt did not verify!
});

let database = new Sequelize({
  dialect: "sqlite",
  storage: "./test.sqlite"
});

let Post = database.define("posts", {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});

finale.initialize({
  app: app,
  sequelize: database
});

let userResource = finale.resource({
  model: Post,
  endpoints: ["/posts", "/posts/:id"]
});

// Resets the database and launches the express app on :8081
database.sync({ force: true }).then(() => {
  app.listen(8081, () => {
    console.log("listening to port localhost:8081");
  });
});
