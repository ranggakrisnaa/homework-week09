const { hashPassword, checkPassword } = require("../middleware/authentication");

const models = require("../models/users");

const jwt = require("jsonwebtoken");

const getDataUsers = async (req, res) => {
  try {
    const { email, role } = req.user;

    const data = await models.getDataUsers();

    res.status(200).json({
      user: {
        email,
        role,
      },
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, gender, password, role } = req.body;
    const newPassword = await hashPassword(password);

    await models.registerUser(email, gender, newPassword, role);

    res.status(200).json({ message: "REGISTER user successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await models.loginUser(email);
    const passwordMatch = await checkPassword(password, data.password);

    if (data && passwordMatch) {
      const token = jwt.sign(
        { user: { id: data.id, email: data.email, role: data.role } },
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

const logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout berhasil" });
};

const updateUser = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { email, gender, password, role } = req.body;
    const data = await models.updateUser(+id, email, gender, password, role);
    res.status(200).json({
      user: {
        email: user.email,
        role: user.role,
      },
      message: "UPDATE user successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  getDataUsers,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
};
