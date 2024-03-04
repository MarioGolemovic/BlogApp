const express = require("express");
const {
  postCommente,
  deleteCommente,
  getCommentesByPost,
} = require("../controllers/CommenteController");
const auth = require("../middlewares/auth");
const commenteRouter = express.Router();

commenteRouter.get("/",getCommentesByPost);

commenteRouter.post("/", auth, postCommente);

commenteRouter.delete("/", auth, deleteCommente);

module.exports = commenteRouter;
