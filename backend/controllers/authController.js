const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
  RegistrationStrategy,
  LoginStrategy,
  JwtStrategy,
} = require("../lib/auth/passport");

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
  async signinUser(req, res) {
    try {
      passport.use(LoginStrategy);
      const user = await authenticate("custom", req, res);
      const body = { id: user.id, email: user.email, role: user.role.key };
      const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
      res.cookie("userId", body.id);
      res.cookie("token", token);
      res.status(200).json({ token });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },
  async authenticateToken(req, res) {
    try {
      passport.use(JwtStrategy);
      const user = await authenticate("jwt", req, res);
      res.status(200).send({ user });
    } catch (err) {
      res.status(404).send(err.message);
    }
  },
  async test(req, res) {
    console.log("yeah");
    let { password, email } = req.body;
    console.log(password + " " + email);
    res.status(200).send({ test: "ok" });
  },
  async logOut(req, res) {
    res.clearCookie("token");
    res.status(200).json({ status: "logged out" });
  },
};
