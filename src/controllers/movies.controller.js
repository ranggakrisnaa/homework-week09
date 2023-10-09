const models = require("../models/movies.model");

const getAllMovies = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const { data, totalMovies } = await models.getAllMovies(+page, +limit);

    res.status(200).json({
      totalData: totalMovies,
      totalPages: Math.floor(totalMovies / +limit),
      currentPage: +page,
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, genres, year } = req.body;

    await models.createMovie(title, genres, year);

    res.status(201).json({
      message: "CREATE movie successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { idMovies } = req.params;
    const { title, genres, year } = req.body;

    const movie = await models.getMovie(+idMovies);
    if (!movie) res.status(404).json({ message: "Data not found" });

    await models.updateMovie(idMovies, title, genres, year);

    res.status(200).json({
      message: "UPDATE movie successfully",
    });
    return movie;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await models.getMovie(+id);
    if (!movie) {
      return res.status(404).json({ message: "Data not found" });
    }

    await models.deleteMovie(id);

    res.status(200).json({
      message: "DELETE movie successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllMovies, createMovie, updateMovie, deleteMovie };
