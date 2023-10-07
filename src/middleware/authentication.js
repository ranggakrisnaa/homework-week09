const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const checkPassword = async (password, hashedPassword) => {
  const check = await bcrypt.compare(password, hashedPassword);
  return check;
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(401).json({ message: "Akses ditolak. Token tidak ada." });

  try {
    const decoded = jwt.verify(token, "private-Key");
    req.user = decoded.user;

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

module.exports = { hashPassword, checkPassword, verifyToken, checkRole };
