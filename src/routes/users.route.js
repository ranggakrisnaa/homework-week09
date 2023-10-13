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
router.put("/users", authentication, updateUser);
router.get("/users", authentication, authorization, getAllUsers);
router.delete("/users/:id", authentication, authorization, deleteUser);

module.exports = router;
