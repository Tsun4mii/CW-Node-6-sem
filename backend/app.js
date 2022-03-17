const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const activationRoutes = require("./routes/activationRoutes");

const express = require("express");
const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded());

authRoutes(app);
activationRoutes(app);

app.listen(5000);
