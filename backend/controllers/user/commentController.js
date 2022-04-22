const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async postComment(req, res) {
    try {
      let { partId, userId, body } = req.body;
      const result = await prisma.comment.create({
        data: {
          partId: Number.parseInt(partId),
          userId: Number.parseInt(userId),
          body: body,
        },
      });
      res.status(200).json({ result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async getComments(req, res) {
    try {
      let partId = req.params.id;
      const comments = await prisma.comment.findMany({
        where: {
          partId: Number.parseInt(partId),
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });
      res.status(200).json({ comments });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
