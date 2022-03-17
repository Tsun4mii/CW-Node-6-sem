const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async activateRegistration(req, res) {
    try {
      const token = req.params.token;
      const isToken = await prisma.activationCode.findFirst({
        where: {
          token: token,
        },
        include: {
          user: true,
        },
      });
      if (isToken.user.status == true) {
        return res.status(200).send("User already activated");
      }
      let currentDate = new Date();
      if (
        isToken &&
        Math.round(currentDate.getTime() / 1000) <
          isToken.creationDate + isToken.lifetime
      ) {
        const update = await prisma.user.update({
          where: {
            id: isToken.user.id,
          },
          data: {
            status: true,
          },
        });
        res.status(200).send({ update });
      } else {
        throw new Error("Wrong code or code already expired");
      }
    } catch (err) {
      res.status(404).send(err.message);
    }
  },
};
