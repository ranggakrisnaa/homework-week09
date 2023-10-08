const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const checkPassword = async (password, hashedPassword) => {
  const check = await bcrypt.compare(password, hashedPassword);
  return check;
};

const signToken = (user) => {
  const data = jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });
  return data;
};

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(401).json({ message: "Akses ditolak. Token tidak ada." });

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload.user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token tidak valid." });
  }
};

const checkRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "anda tidak diizinkan untuk memanipulasi data" });
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
