const models = require("../models/movies.model");

const getAllMovies = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const { data, totalMovies } = await models.getAllMovies(+page, +limit);
    if (data.length === 0) throw { name: "ErrorNotFound" };

    res.status(200).json({
      status: true,
      currentPage: +page,
      totalData: totalMovies,
      totalPages: Math.floor(totalMovies / +limit),
      data,
    });
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const { title, genres, year } = req.body;

    await models.createMovie(title, genres, year);

    res.status(201).json({
      status: true,
      message: "CREATE movie successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { idMovies } = req.params;
    const { title, genres, year } = req.body;

    const movie = await models.getMovie(+idMovies);
    if (!movie) throw { name: "ErrorNotFound" };

    await models.updateMovie(idMovies, title, genres, year, movie);

    res.status(200).json({
      status: true,
      message: "UPDATE movie successfully",
    });
    return movie;
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await models.getMovie(+id);
    if (!movie) throw { name: "ErrorNotFound" };

    await models.deleteMovie(id);

    res.status(200).json({
      status: true,
      message: "DELETE movie successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllMovies, createMovie, updateMovie, deleteMovie };
