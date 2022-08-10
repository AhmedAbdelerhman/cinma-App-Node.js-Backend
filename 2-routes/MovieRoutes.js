const express = require("express");

const movieController = require("../1-controllers/MovieController");

const isAuth = require("../isAuth/isAuth");

const router = express.Router();

router.get("/", isAuth, movieController.getAllMovies);

router.post("/new-move", isAuth, movieController.createMovie);
router.put("/:id", isAuth, movieController.updateMovie);
router.delete("/:id", isAuth, movieController.deleteMovie);

module.exports = router;
