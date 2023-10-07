const prisma = require("../config/database");

const getDataUsers = async () => {
  const data = await prisma.users.findMany();
  return data;
};

const registerUser = async (email, gender, newPassword, role) => {
  const data = await prisma.users.create({
    data: {
      email: email,
      gender: gender,
      password: newPassword,
      role: role,
    },
  });
  return data;
};

const loginUser = async (email) => {
  console.log(email);
  const data = await prisma.users.findFirst({
    where: { email: email },
  });
  return data;
};

const updateUser = async (id, email, gender, password, role) => {
  const data = await prisma.users.update({
    where: { id: id },
    data: {
      email: email,
      gender: gender,
      password: password,
      role: role,
    },
  });
  return data;
};

module.exports = {
  getDataUsers,
  registerUser,
  loginUser,
  updateUser,
};
