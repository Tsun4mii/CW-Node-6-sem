const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async getModels(req, res) {
    try {
      const models = await prisma.carModel.findMany({});
      res.status(200).json({ models });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async addModel(req, res) {
    try {
      let { name, markId } = req.body;
      const addedModel = await prisma.carModel.create({
        data: {
          carModelName: name,
          markId: Number.parseInt(markId),
        },
      });
      res.status(200).json({ addedModel });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async getById(req, res) {
    try {
      let id = req.params.id;
      const model = await prisma.carModel.findFirst({
        where: {
          id: Number.parseInt(id),
        },
      });
      res.status(200).json({ model });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async edit(req, res) {
    try {
      let { name, id } = req.body;
      const edited = await prisma.carModel.update({
        where: { id: Number.parseInt(id) },
        data: {
          carModelName: name,
        },
      });
      res.status(200).json({ edited });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async delete(req, res) {
    try {
      let { id } = req.body;
      const deleted = await prisma.carModel.delete({
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
