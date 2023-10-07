const express = require("express");
const { verifyToken, checkRole } = require("../middleware/authentication");
const {
  getDataUsers,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
} = require("../controller/users");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", verifyToken, logoutUser);

router.get("/", verifyToken, getDataUsers);

router.patch("/:id", verifyToken, checkRole, updateUser);

module.exports = router;
