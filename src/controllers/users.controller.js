const { hashPassword, checkPassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");
const models = require("../models/users.model");

const getAllUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { email, role } = req.user;

    const { data, totalUsers } = await models.getAllUsers(+page, +limit);

    res.status(200).json({
      user: {
        email,
        role,
      },
      totalData: totalUsers,
      totalPages: Math.floor(totalUsers / +limit),
      currentPage: +page,
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
      const token = generateToken({
        id: data.id,
        email: data.email,
        role: data.role,
      });

      res.status(200).json({ message: "LOGIN user successfully", token });
    } else {
      res.status(401).json({ error: "Email or password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, gender, password, role } = req.body;

    const user = await models.getUser(+id);

    if (!user) {
      return res.status(404).json({ message: "Data not found" });
    }

    const newPassword = await hashPassword(password);
    await models.updateUser(+id, email, gender, newPassword, role);

    res.status(200).json({
      message: "UPDATE user successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email, role } = req.user;
    const { id } = req.params;

    const user = await models.getUser(+id);
    if (!user) {
      return res.status(404).json({ message: "Data not found" });
    }

    await models.deleteUser(+id);

    res.status(200).json({
      user: {
        email,
        role,
      },
      message: "DELETE user successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
