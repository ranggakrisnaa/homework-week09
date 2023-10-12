const express = require("express");
const {
  authentication,
  authorization,
} = require("../middlewares/auth.middleware");
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
router.use(authentication);
router.put("/users", updateUser);
router.get("/users", getAllUsers);
router.use(authorization);
router.delete("/users/:id", deleteUser);

module.exports = router;
