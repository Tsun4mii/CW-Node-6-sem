const entitesRoutes = require("./entititesRoutes");
const bucketRoutes = require("./bucketRoutes");
const orderRoutes = require("./orderRoutes");
const searchRoutes = require("./searchRoutes");

module.exports = (app) => {
  entitesRoutes(app);
  bucketRoutes(app);
  orderRoutes(app);
  searchRoutes(app);
};
