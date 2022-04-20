const commentsController = require("../controllers/user/commentController");

module.exports = (app) => {
  app.post("/api/part/comment", commentsController.postComment);
  app.get("/api/part/comment/:id", commentsController.getComments);
};
