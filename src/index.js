require("dotenv").config();
const express = require("express");
const usersRoutes = require("./routes/users.route");
const moviesRoutes = require("./routes/movies.route");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../openapi.json");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler.middleware");

const PORT = process.env.PORT || 2000;
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());

app.get("/ping", (req, res) => {
  try {
    res.status(200).json({ ping: "success" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.use("/api", moviesRoutes);
app.use("/api", usersRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
