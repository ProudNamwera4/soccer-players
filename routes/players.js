const express = require("express");
const router = express.Router();
const validation = require("../middleware/validate");

const playersController = require("../controllers/players");

router.get("/", playersController.getAll);

router.get("/:id", playersController.getSingle);

router.post("/", validation.savePlayer, playersController.createPlayer);

router.put("/:id", validation.savePlayer, playersController.updatePlayer);

router.delete("/:id", playersController.deletePlayer);

module.exports = router;
