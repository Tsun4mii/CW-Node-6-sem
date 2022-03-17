const authController = require("../controllers/authController");

module.exports = (app) => {
  app.post("/api/signup", authController.signupUser);
};
