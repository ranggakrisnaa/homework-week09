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

router.use(authentication);
router.get("/movies", getAllMovies);
router.post("/movies", createMovie);
router.put("/movies/:idMovies", updateMovie);
router.use(authorization);
router.delete("/movies/:id", deleteMovie);

module.exports = router;
