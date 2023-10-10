const prisma = require("../config/database");

const getAllUsers = async (page, limit) => {
  const data = await prisma.users.findMany({
    skip: (page - 1) * limit,
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

const updateUser = async (id, user) => {
  const { email, gender, role, password } = user;
  return await prisma.users.update({
    where: { id },
    data: {
      email,
      gender,
      role,
      password,
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
