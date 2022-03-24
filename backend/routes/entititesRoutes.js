const partController = require("../controllers/entitites/part/partController");

module.exports = (app) => {
  app.post("/api/entites/part/add", partController.addPart);
  app.post("/api/entities/parts", partController.getParts);
  app.post("/api/entities/parts/getById", partController.getById);
  app.post("/api/entities/parts/edit", partController.edit);
};
