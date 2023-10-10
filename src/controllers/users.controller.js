const { hashPassword, checkPassword } = require("../utils/bcrypt.utils");
const { generateToken } = require("../utils/jwt.utils");
const models = require("../models/users.model");

const getAllUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (!page && !limit)
      res.status(404).json({ message: "Data query is null" });

    const { data, totalUsers } = await models.getAllUsers(+page, +limit);

    res.status(200).json({
      totalData: totalUsers,
      totalPages: Math.floor(totalUsers / +limit),
      currentPage: +page,
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, gender, password, role } = req.body;
    const newPassword = await hashPassword(password);

    await models.registerUser(email, gender, newPassword, role);

    res.status(201).json({ message: "REGISTER user successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await models.loginUser(email);
    if (!data) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }

    const isPasswordMatch = await checkPassword(password, data.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }

    const token = generateToken({
      id: data.id,
      email: data.email,
      role: data.role,
    });

    res.status(200).json({ message: "LOGIN user successfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { email, gender, oldPassword, newPassword, role } = req.body;

    const user = await models.getUser(+id);

    let updatedUser = {
      email,
      gender,
      role,
    };

    if (oldPassword) {
      const isPasswordMatch = await checkPassword(oldPassword, user.password);
      if (isPasswordMatch) {
        const hashPass = await hashPassword(newPassword);
        updatedUser = {
          ...updatedUser,
          password: hashPass,
        };
      } else {
        return res.status(404).json({ message: "Please Check Old Password" });
      }
    }

    await models.updateUser(+id, updatedUser);

    res.status(200).json({
      message: "UPDATE user successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await models.getUser(+id);
    if (!user) {
      return res.status(404).json({ message: "Data not found" });
    }

    await models.deleteUser(+id);

    res.status(200).json({
      message: "DELETE user successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
