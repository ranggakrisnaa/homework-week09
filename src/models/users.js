const prisma = require("../config/database");

const getAllUsers = async (page, limit) => {
  const offset = (page - 1) * limit;
  const data = await prisma.users.findMany({
    skip: offset,
    take: limit,
  });

  const totalUsers = await prisma.users.count();

  return { data, totalUsers };
};

const getUser = async (id) => {
  return prisma.users.findUnique({ where: { id } });
};

const registerUser = async (email, gender, newPassword, role) => {
  return await prisma.users.create({
    data: {
      email,
      gender,
      password: newPassword,
      role,
    },
  });
};

const loginUser = async (email) => {
  return await prisma.users.findFirst({
    where: { email },
  });
};

const updateUser = async (id, email, gender, password, role) => {
  return await prisma.users.update({
    where: { id: id },
    data: {
      email,
      gender,
      password,
      role,
    },
  });
};

const deleteUser = async (id) => {
  return await prisma.users.delete({ where: { id } });
};

module.exports = {
  getAllUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
