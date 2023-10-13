const { verifyToken } = require("../utils/jwt.util");

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw { name: "Unauthenticated" };
    }

    const token =
      req.headers.authorization.split(" ")[1] || req.headers.authorization;
    const payload = await verifyToken(token);
    req.user = payload.user;

    next();
  } catch (error) {
    next(error);
  }
};

const authorization = (req, res, next) => {
  if (req.user.role !== "admin") throw { name: "Unauthorized" };
  next();
};

module.exports = {
  authentication,
  authorization,
};
