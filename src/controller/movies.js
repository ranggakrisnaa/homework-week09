const prisma = require("../config/database");

const getAllMovies = async (req, res, users) => {
  try {
    const { page, limit } = req.query;
    const { email, role } = req.user;
    const offset = (+page - 1) * limit;
    const movie = await prisma.movies.findMany({
      skip: offset,
      take: +limit,
    });

    const totalUsers = await prisma.users.count();
    res.status(200).json({
      user: {
        email,
        role,
      },
      totalPages: Math.floor(totalUsers / +limit),
      currentPage: +page,
      movie,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const createMovie = async (req, res) => {
  try {
    const { email, role } = req.user;
    const { title, genres, year } = req.body;

    if (role !== "admin")
      return res
        .status(401)
        .json({ message: "tidak bisa mengedit data, anda bukan admin" });

    const data = await prisma.movies.create({
      data: {
        title,
        genres,
        year,
      },
    });
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

    if (role !== "admin")
      return res
        .status(401)
        .json({ message: "tidak bisa mengedit data, anda bukan admin" });

    const data = await prisma.movies.update({
      where: { id: +idMovies },
      data: {
        title,
        genres,
        year,
      },
    });

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

module.exports = { getAllMovies, createMovie, updateMovie };
