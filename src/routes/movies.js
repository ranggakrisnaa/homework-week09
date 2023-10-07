const express = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
} = require("../controller/movies");
const { verifyToken } = require("../middleware/authentication");

const router = express.Router();

router.get("/", verifyToken, getAllMovies);

router.post("/", verifyToken, createMovie);

router.patch("/:idMovies", verifyToken, updateMovie);

module.exports = router;
