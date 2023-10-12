const { verifyToken } = require("../utils/jwt.utils");

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw { name: "unauthenticated" };
    }

    const token = req.headers.authorization.split(" ")[1];
    // return res
    //   .status(404)
    //   .json({ message: "unaunthenticated. Token does not exist." });
    const payload = await verifyToken(token);
    req.user = payload.user;

    next();
  } catch (error) {
    // res.status(401).json({ message: "Token is invalid." });
    next(error);
  }
};

const authorization = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "Not permitted to access the data" });
  }

  next();
};

module.exports = {
  authentication,
  authorization,
};
