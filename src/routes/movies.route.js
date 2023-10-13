const express = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.controller");
const {
  authentication,
  authorization,
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/movies", authentication, getAllMovies);
router.post("/movies", authentication, createMovie);
router.put("/movies/:idMovies", authentication, updateMovie);
router.delete("/movies/:id", authentication, authorization, deleteMovie);

module.exports = router;
