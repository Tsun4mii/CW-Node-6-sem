const partController = require("../controllers/entitites/part/partController");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/img");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  },
});
const upload = multer({ storage: storage });
module.exports = (app) => {
  app.post("/api/entites/part/add", partController.addPart);
  app.post("/api/entities/parts", partController.getParts);
  app.post("/api/entities/parts/getById", partController.getById);
  app.post(
    "/api/entities/parts/edit",
    upload.single("file"),
    partController.edit
  );
};
