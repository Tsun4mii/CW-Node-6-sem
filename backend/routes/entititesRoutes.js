const partController = require("../controllers/entitites/part/partController");
const markController = require("../controllers/entitites/mark/markController");
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
  app.post("/api/entities/parts/getPag", partController.getPagination);
  app.get("/api/entities/marks", markController.getMarks);
  app.post("/api/entities/marks/add", markController.addMark);
  app.get("/api/entities/marks/:id", markController.getById);
  app.put("/api/entities/marks/edit", markController.edit);
  app.delete("/api/entities/marks/delete", markController.delete);
};
