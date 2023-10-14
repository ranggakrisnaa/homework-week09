const prisma = require("../config/database");

const getAllMovies = async (page, limit) => {
  const data = await prisma.movies.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalMovies = await prisma.movies.count();
  return { data, totalMovies };
};

const getMovie = async (id) => {
  return await prisma.movies.findUnique({
    where: { id },
  });
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

const updateMovie = async (idMovies, title, genres, year, movies) => {
  return await prisma.movies.update({
    where: { id: +idMovies },
    data: {
      title: title || movies.title,
      genres: genres || movies.genres,
      year: year || movies.year,
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
