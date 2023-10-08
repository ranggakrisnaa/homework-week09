const prisma = require("../config/database");

const getAllUsers = async () => {
  return await prisma.users.findMany();
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
