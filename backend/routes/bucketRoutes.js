const bucketController = require("../controllers/user/bucketController");

module.exports = (app) => {
  app.post("/api/bucket", bucketController.addPartToBucket);
  app.delete("/api/bucket", bucketController.deleteItem);
};
