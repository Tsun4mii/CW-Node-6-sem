const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const activationRoutes = require("./routes/activationRoutes");
const entitesRoutes = require("./routes/entititesRoutes");
const commentRouter = require("./routes/commentsRoutes");
const routesMain = require("./routes/routesMain");
const swaggerUi = require("swagger-ui-express");
const swaggetJSDoc = require("swagger-jsdoc");
const express = require("express");
const app = express();

const swaggerSpec = swaggetJSDoc({
  swaggerDefinition: {
    info: {
      title: "Backend for CW",
      version: "1.0.0",
    },
  },
  apis: [`${__dirname}/routes/*.js`],
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static("public/img"));
app.use(express.json({ limit: "50mb" }));
app.use(passport.initialize());
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
// TODO:Move all routes imports to routesMain.js
routesMain(app);
authRoutes(app);
activationRoutes(app);
commentRouter(app);

app.listen(5000);
