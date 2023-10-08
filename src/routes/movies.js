const express = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controller/movies");
const { isAuthenticated, checkRole } = require("../middleware/authentication");

const router = express.Router();

router.get("/api/movies/", isAuthenticated, getAllMovies);

router.post("/api/movies/", isAuthenticated, checkRole, createMovie);

router.patch("/api/movies/:idMovies", isAuthenticated, checkRole, updateMovie);

router.delete("/api/movies/:id", isAuthenticated, checkRole, deleteMovie);

module.exports = router;
