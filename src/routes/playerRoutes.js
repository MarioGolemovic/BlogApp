const express = require("express");
const {
  getPlayer,
  getPlayers,
  createPlayer,
  deletePlayer,
  updatePlayer,
} = require("../controllers/PlayerController");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const playerRouter = express.Router();

playerRouter.get("/", getPlayer);

playerRouter.get("/players", getPlayers);

playerRouter.post("/", auth, checkRole, createPlayer);

playerRouter.delete("/", auth, checkRole, deletePlayer);

playerRouter.put("/", auth, checkRole, updatePlayer);

module.exports = playerRouter;