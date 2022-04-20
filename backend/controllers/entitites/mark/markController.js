const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async getMarks(req, res) {
    try {
      const marks = await prisma.carMark.findMany({});
      res.status(200).json({ marks });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async addMark(req, res) {
    try {
      let { name } = req.body;
      const addedMark = await prisma.carMark.create({
        data: {
          carMarkName: name,
        },
      });
      res.status(200).json({ addedMark });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async getById(req, res) {
    try {
      let id = req.params.id;
      const mark = await prisma.carMark.findFirst({
        where: {
          id: Number.parseInt(id),
        },
      });
      res.status(200).json({ mark });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async edit(req, res) {
    try {
      let { name, id } = req.body;
      const edited = await prisma.carMark.update({
        where: { id: Number.parseInt(id) },
        data: {
          carMarkName: name,
        },
      });
      res.status(200).json({ edited });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  },
  async delete(req, res) {
    try {
      let { id } = req.body;
      const deleted = await prisma.carMark.delete({
        where: {
          id: Number.parseInt(id),
        },
      });
      res.status(200).json({ deleted });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
