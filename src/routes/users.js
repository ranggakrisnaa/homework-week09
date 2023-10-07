const express = require("express");

const {
  getDataUsers,
  registerUsers,
  loginUsers,
  logoutUsers,
} = require("../controller/users");

const { verifyToken } = require("../middleware/authentication");

const router = express.Router();

router.get("/", getDataUsers);

router.post("/register", registerUsers);

router.post("/login", loginUsers);

router.post("/logout", verifyToken, logoutUsers);

module.exports = router;
