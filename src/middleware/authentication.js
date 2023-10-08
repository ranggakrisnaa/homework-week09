const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const checkPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const signToken = (user) => {
  return jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });
};

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized. Token does not exist." });

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload.user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is invalid." });
  }
};

const checkRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "Not permitted to access the data" });
  }

  next();
};

module.exports = {
  hashPassword,
  checkPassword,
  isAuthenticated,
  checkRole,
  signToken,
};
