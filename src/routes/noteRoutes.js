const express = require("express");
const {
  getNote,
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/NoteController");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const noteRouter = express.Router();

noteRouter.get("/", auth, getNote);

noteRouter.get("/notes", auth, getNotes);

noteRouter.post("/", auth, checkRole, createNote);

noteRouter.delete("/", auth, checkRole, deleteNote);

noteRouter.put("/", auth, checkRole, updateNote);

module.exports = noteRouter;
