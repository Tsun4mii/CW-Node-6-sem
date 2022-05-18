const searchController = require("../controllers/searchController");

module.exports = (app) => {
  app.get("/api/search", searchController.testGet);
  app.get("/api/search/allMarks", searchController.findAllMarks);
  app.get("/api/search/allModels", searchController.findAllModels);
  app.get("/api/search/allCategories", searchController.findAllCategories);
  app.post("/api/search/modelsByMark", searchController.refreshModels);
  app.post("/api/search/markByModels", searchController.refreshMarks);
  app.post("/api/search/paramSearch", searchController.paramsSearch);
};
