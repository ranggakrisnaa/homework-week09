const prisma = require("../config/database");

const getDataUsers = async () => {
  return await prisma.users.findMany();
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

module.exports = {
  getDataUsers,
  registerUser,
  loginUser,
  updateUser,
};
