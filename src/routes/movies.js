const express = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controller/movies");
const { verifyToken, checkRole } = require("../middleware/authentication");

const router = express.Router();

router.get("/", verifyToken, getAllMovies);

router.post("/", verifyToken, checkRole, createMovie);

router.patch("/:idMovies", verifyToken, checkRole, updateMovie);

router.delete("/:id", verifyToken, checkRole, deleteMovie);

module.exports = router;
