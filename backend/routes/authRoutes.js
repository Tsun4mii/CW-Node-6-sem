const authController = require("../controllers/authController");

module.exports = (app) => {
  app.post("/api/signup", authController.signupUser);
  app.post("/api/signin", authController.signinUser);
  app.post("/api/authenticate", authController.authenticateToken);
  app.get("/api/test", authController.test);
  app.post("/api/test", authController.test);
};
