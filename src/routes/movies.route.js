const express = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.controller");
const { isAuthenticated, checkRole } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(isAuthenticated);
router.get("/movies/", getAllMovies);
router.use(checkRole);
router.post("/movies/", createMovie);
router.patch("/movies/:idMovies", updateMovie);
router.delete("/movies/:id", deleteMovie);

module.exports = router;
