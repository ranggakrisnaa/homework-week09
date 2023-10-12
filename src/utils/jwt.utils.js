const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (user) => {
  return jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        err = {
          name: "JsonWebTokenError",
          message: "jwt malformed",
        };
        reject(err); // Melempar kesalahan jika ada
      } else {
        resolve(decoded); // Mengembalikan data yang didekode jika berhasil
      }
    });
  });
};

module.exports = { generateToken, verifyToken };
