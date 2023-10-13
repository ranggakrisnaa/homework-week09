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
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = { generateToken, verifyToken };
