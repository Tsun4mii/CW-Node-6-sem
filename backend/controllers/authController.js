const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const { RegistrationStrategy } = require("../lib/auth/passport");

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, user) => {
      if (error) {
        return reject(error);
      }
      resolve(user);
    })(req, res);
  });

module.exports = {
  async signupUser(req, res) {
    try {
      passport.use(RegistrationStrategy);
      const user = await authenticate("custom", req, res);
      const body = { id: user.id, email: user.email };
      res.status(200).send({ body });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },
};
