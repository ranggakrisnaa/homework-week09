const express = require("express");
const { isAuthenticated, checkRole } = require("../middleware/auth.middleware");
const {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/users/:id", updateUser);

router.use(isAuthenticated);

router.get("/users/", getAllUsers);

router.use(checkRole);

router.delete("/users/:id", deleteUser);

module.exports = router;
