const prisma = require("../config/database");
const {
  hashPassword,
  checkPassword,
  randomNumber,
} = require("../middleware/authentication");

const jwt = require("jsonwebtoken");

const getDataUsers = async (req, res) => {
  try {
    const data = await prisma.users.findMany();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const registerUsers = async (req, res) => {
  try {
    const { email, gender, password, role } = req.body;
    const newPassword = await hashPassword(password);
    const user = await prisma.users.create({
      data: {
        email: email,
        gender: gender,
        password: newPassword,
        role: role,
      },
    });

    res.status(200).json({ message: "REGISTER user successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findFirst({
      where: { email: email },
    });

    const passwordMatch = await checkPassword(password, user.password);

    if (user && passwordMatch) {
      const token = jwt.sign(
        { user: { id: user.id, email: user.email, role: user.role } },
        "private-Key",
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "LOGIN user successfully", token });
    } else {
      return res
        .status(401)
        .json({ error: "email atau kata sandi anda salah" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const logoutUsers = async (req, res) => {
  let token = req.headers.authorization;
  const random = randomNumber();
  token = token + random;

  res.status(200).json({ message: "Logout berhasil" });
};

module.exports = { getDataUsers, registerUsers, loginUsers, logoutUsers };
