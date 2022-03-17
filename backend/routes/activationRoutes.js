const activationController = require("../controllers/user/activationController");

module.exports = (app) => {
  app.post(
    "/api/activate/user/:token",
    activationController.activateRegistration
  );
};
