const { verifyToken } = require("../utils/jwt.utils");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res
      .status(404)
      .json({ message: "Unauthorized. Token does not exist." });

  try {
    const payload = verifyToken(token);
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
  isAuthenticated,
  checkRole,
};
