const express = require("express");
const {
  postComment,
  deleteComment,
  getCommentsByNote,
} = require("../controllers/CommentController");
const auth = require("../middlewares/auth");
const comment = require("../middlewares/comment");
const commentRouter = express.Router();

commentRouter.get("/", auth, comment, getCommentsByNote);

commentRouter.post("/", auth, comment, postComment);

commentRouter.delete("/", auth, comment, deleteComment);

module.exports = commentRouter;
