const models = require("../models/movies");

const getAllMovies = async (req, res, users) => {
  try {
    const { page, limit } = req.query;
    const { email, role } = req.user;
    const { data, totalUsers } = await models.getAllMovies(page, limit);
    res.status(200).json({
      user: {
        email,
        role,
      },
      totalPages: Math.floor(totalUsers / +limit),
      currentPage: +page,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const createMovie = async (req, res) => {
  try {
    const { email, role } = req.user;
    const { title, genres, year } = req.body;

    const data = await models.createMovie(title, genres, year);
    res.status(200).json({
      user: {
        email,
        role,
      },
      message: "CREATE movie successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { email, role } = req.user;
    const { idMovies } = req.params;
    const { title, genres, year } = req.body;

    const data = await models.updateMovie(idMovies, title, genres, year);

    res.status(200).json({
      user: {
        email,
        role,
      },
      message: "UPDATE movie successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.user;

    await models.deleteMovie(id);
    res.status(200).json({
      user: {
        email,
        role,
      },
      message: "DELETE movie successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = { getAllMovies, createMovie, updateMovie, deleteMovie };
