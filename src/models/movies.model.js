const prisma = require("../config/database");

const getAllMovies = async (page, limit) => {
  const offset = (page - 1) * limit;
  const data = await prisma.movies.findMany({
    skip: offset,
    take: limit,
  });

  const totalMovies = await prisma.movies.count();

  return { data, totalMovies };
};

const createMovie = async (title, genres, year) => {
  return await prisma.movies.create({
    data: {
      title,
      genres,
      year,
    },
  });
};

const updateMovie = async (idMovies, title, genres, year) => {
  return await prisma.movies.update({
    where: { id: +idMovies },
    data: {
      title,
      genres,
      year,
    },
  });
};

const deleteMovie = async (id) => {
  return await prisma.movies.delete({
    where: { id: +id },
  });
};

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
