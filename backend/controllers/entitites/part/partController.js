const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");
const upload = multer({ dest: "../../../public/img" }).single("part_img");

module.exports = {
  async addPart(req, res) {
    try {
      let { name, price, stock, img_path } = req.body;
      const addedPart = await prisma.part.create({
        data: {
          price: Number.parseFloat(price),
          name: name,
          in_stock: Number.parseInt(stock),
          img_path: img_path,
        },
      });
      res.status(200).json({ addedPart });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async getParts(req, res) {
    try {
      const parts = await prisma.part.findMany({});
      res.status(200).json({ parts });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async getById(req, res) {
    try {
      let { id } = req.body;
      const part = await prisma.part.findFirst({
        where: {
          id: id,
        },
      });
      res.status(200).json({ part });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async edit(req, res) {
    try {
      let { updateName, id, updatePrice } = req.body;
      const update = await prisma.part.update({
        where: { id: Number.parseInt(id) },
        data: {
          name: updateName,
          price: Number.parseFloat(updatePrice),
        },
      });
      res.status(200).json({ update });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  },
};