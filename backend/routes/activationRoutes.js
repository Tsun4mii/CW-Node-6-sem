const activationController = require("../controllers/user/activationController");

module.exports = (app) => {
  app.get(
    "/api/activate/user/:token",
    activationController.activateRegistration
  );
};
