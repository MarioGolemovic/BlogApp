const express = require("express");
const {
  getPost,
  getPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/PostController");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const postRouter = express.Router();

postRouter.get("/", getPost);

postRouter.get("/posts", getPosts);

postRouter.post("/", auth, checkRole, createPost);

postRouter.delete("/", auth, checkRole, deletePost);

postRouter.put("/", auth, checkRole, updatePost);

module.exports = postRouter;
