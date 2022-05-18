const searchService = require("../Services/searchService");

module.exports = {
  async testGet(req, res) {
    const result = await searchService.search(
      await searchService.processUrl(req)
    );
    return res.status(200).json({ result });
  },
  async findAllMarks(req, res) {
    const result = await searchService.selectAllMarks();
    return res.status(200).json({ result });
  },
  async findAllModels(req, res) {
    const result = await searchService.selectAllModels();
    return res.status(200).json({ result });
  },
  async findAllCategories(req, res) {
    const result = await searchService.selectAllCategories();
    return res.status(200).json({ result });
  },
  async refreshModels(req, res) {
    const result = await searchService.selectModelsByMark(req.body.markId);
    return res.status(200).json({ result });
  },
  async refreshMarks(req, res) {
    const result = await searchService.selectMarksByModel(req.body.modelId);
    return res.status(200).json({ result });
  },
  async paramsSearch(req, res) {
    const result = await searchService.paramSearch(
      req.body.markId,
      req.body.modelId
    );
    return res.status(200).json({ result });
  },
};
