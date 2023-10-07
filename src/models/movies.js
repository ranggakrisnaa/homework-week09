const prisma = require("../config/database");

const getAllMovies = async (page, limit) => {
  const offset = (+page - 1) * limit;
  const data = await prisma.movies.findMany({
    skip: offset,
    take: +limit,
  });

  const totalUsers = await prisma.users.count();

  return { data, totalUsers };
};

const createMovie = async (title, genres, year) => {
  const data = await prisma.movies.create({
    data: {
      title,
      genres,
      year,
    },
  });
  return data;
};

const updateMovie = async (idMovies, title, genres, year) => {
  const data = await prisma.movies.update({
    where: { id: +idMovies },
    data: {
      title,
      genres,
      year,
    },
  });

  return data;
};

const deleteMovie = async (id) => {
  const data = await prisma.movies.delete({
    where: { id: +id },
  });

  return data;
};

module.exports = { getAllMovies, createMovie, updateMovie, deleteMovie };
