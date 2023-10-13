const errorHandler = (err, req, res, next) => {
  if (err.name === "Unauthenticated") {
    res.status(401).json({ status: false, message: "Unauthenticated User" });
  } else if (err.name === "Unauthorized") {
    res.status(403).json({ status: false, message: "Unauthorized User Role" });
  } else if (err.name === "InvalidPassword") {
    res.status(400).json({ status: false, message: "Wrong Old Password" });
  } else if (err.name === "InvalidCredentials") {
    res.status(400).json({ status: false, message: "Wrong Email or Password" });
  } else if (err.name === "JsonWebTokenError") {
    res.status(404).json({ status: false, message: "Token is invalid" });
  } else if (err.name === "ErrorNotFound") {
    res.status(404).json({ status: false, message: "Error Not Found" });
  } else {
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = errorHandler;
