const express = require("express");
const {
  postComment,
  deleteComment,
  getCommentsByNote,
} = require("../controllers/CommentController");
const auth = require("../middlewares/auth");
const commentRouter = express.Router();

commentRouter.get("/",getCommentsByNote);

commentRouter.post("/", auth, postComment);

commentRouter.delete("/", auth, deleteComment);

module.exports = commentRouter;
