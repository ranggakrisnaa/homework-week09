const { hashPassword, checkPassword } = require("../utils/bcrypt.util");
const { generateToken } = require("../utils/jwt.util");
const models = require("../models/users.model");

const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const { data, totalUsers } = await models.getAllUsers(+page, +limit);
    if (data.length === 0) throw { name: "ErrorNotFound" };

    res.status(200).json({
      status: true,
      totalData: totalUsers,
      totalPages: Math.ceil(totalUsers / +limit),
      currentPage: +page,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { email, gender, password, role } = req.body;
    if (!email || !password) throw { name: "badRequest" };

    const newPassword = await hashPassword(password);
    await models.registerUser(email, gender, newPassword, role);

    res
      .status(201)
      .json({ status: true, message: "REGISTER user successfully" });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await models.loginUser(email);
    if (!data) throw { name: "InvalidCredentials" };

    const isPasswordMatch = await checkPassword(password, data.password);
    if (!isPasswordMatch) throw { name: "InvalidCredentials" };

    const token = generateToken({
      id: data.id,
      email: data.email,
      role: data.role,
    });

    res
      .status(200)
      .json({ status: true, message: "LOGIN user successfully", token });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
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
        throw { name: "InvalidPassword" };
      }
    }

    await models.updateUser(+id, updatedUser, user);

    res.status(200).json({ status: true, message: "UPDATE user successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await models.getUser(+id);
    if (!user) throw { name: "ErrorNotFound" };

    await models.deleteUser(+id);

    res.status(200).json({
      status: true,
      message: "DELETE user successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
