const Custom = require("passport-custom");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const RegistrationStrategy = new Custom.Strategy(async (req, done) => {
  try {
    let { email, password } = req.body;
    let user = await prisma.user.findFirst({ where: { email: email } });
    if (user) {
      return done(new Error("Email already in use"));
    }

    let token = crypto.randomBytes(20).toString("hex");
    let currentDate = new Date();
    let creationDate = Math.round(currentDate.getTime() / 1000);
    let passwordHash = await bcrypt.hash(password, 10);
    let role = await prisma.role.findFirst({ where: { key: "user" } });

    user = await prisma.user.create({
      data: {
        email: email,
        password: passwordHash,
        role: {
          connect: { id: role.id },
        },
        ActivationCodes: {
          create: {
            token: token,
            creationDate: creationDate,
            lifetime: Number(process.env.ACTIVATION_TOKEN_LIFETIME),
          },
        },
      },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = { RegistrationStrategy };
