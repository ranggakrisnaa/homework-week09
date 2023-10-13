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

const registerUser = async (email, gender, password, role) => {
  return await prisma.users.create({
    data: {
      email,
      gender,
      password,
      role,
    },
  });
};

const loginUser = async (email) => {
  return await prisma.users.findFirst({
    where: { email },
  });
};

const updateUser = async (id, updatedUser, users) => {
  const { email, gender, role, password } = updatedUser;
  return await prisma.users.update({
    where: { id },
    data: {
      email: email || users.email,
      gender: gender || users.gender,
      role: role || users.role,
      password: password || users.password,
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
