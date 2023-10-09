const express = require("express");
const { isAuthenticated, checkRole } = require("../middleware/authentication");
const {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controller/users");

const router = express.Router();

router.post("/api/register", registerUser);

router.post("/api/login", loginUser);

router.get("/api/users/", isAuthenticated, getAllUsers);

router.patch("/api/users/:id", isAuthenticated, checkRole, updateUser);

router.delete("/api/users/:id", isAuthenticated, checkRole, deleteUser);

module.exports = router;
