const express = require("express");
const { isAuthenticated, checkRole } = require("../middleware/authentication");
const {
  getDataUsers,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
} = require("../controller/users");

const router = express.Router();

router.post("/api/register", registerUser);

router.post("/api/login", loginUser);

router.post("/api/logout", isAuthenticated, logoutUser);

router.get("/api/users/", isAuthenticated, getDataUsers);

router.patch("/api/users/:id", isAuthenticated, checkRole, updateUser);

module.exports = router;
