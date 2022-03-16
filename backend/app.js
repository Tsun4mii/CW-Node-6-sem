const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const { RegistrationStrategy } = require("./lib/auth/passport");

const express = require("express");
const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded());
passport.use(RegistrationStrategy);

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, user) => {
      if (error) {
        return reject(error);
      }
      resolve(user);
    })(req, res);
  });

app.post("/", async (req, res) => {
  const user = await authenticate("custom", req, res);
  const body = { id: user.id, email: user.email };
  res.status(200).send({ body });
});

app.listen(5000);
