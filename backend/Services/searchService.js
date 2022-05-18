const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async processUrl(req) {
    const { name, mark, model, category } = req.query;
    return { name, mark, model, category };
  },
  async search(props) {
    const searchResult = await prisma.part.findMany({
      where: {
        name: props.name,
        carMark: {
          carMarkName: props.mark,
        },
        carModel: {
          carModelName: props.model,
        },
        category: {
          categoryName: props.category,
        },
      },
    });
    return searchResult;
  },
  async selectAllMarks() {
    const allMarks = await prisma.carMark.findMany();
    return allMarks;
  },
  async selectAllModels() {
    const allModels = await prisma.carModel.findMany();
    return allModels;
  },
  async selectAllCategories() {
    const allCategories = await prisma.category.findMany();
    return allCategories;
  },
  async selectModelsByMark(markId) {
    const modelsById = await prisma.carModel.findMany({
      where: {
        mark: {
          id: Number.parseInt(markId),
        },
      },
    });
    return modelsById;
  },
  async selectMarksByModel(modelId) {
    const model = await prisma.carModel.findFirst({
      where: {
        id: Number.parseInt(modelId),
      },
    });
    const mark = await prisma.carMark.findMany({
      where: {
        id: model.markId,
      },
    });
    console.log(mark);
    return mark;
  },
  async paramSearch(markId, modelId) {
    const parts = await prisma.part.findMany({
      where: {
        carMarkId: Number.parseInt(markId),
        carModelId: Number.parseInt(modelId),
      },
    });
    return parts;
  },
};
