require("dotenv").config();
const express = require("express");
const usersRoutes = require("./routes/users.route");
const moviesRoutes = require("./routes/movies.route");
const morgan = require("morgan");

const PORT = process.env.PORT || 2000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/ping", (req, res) => {
  try {
    res.status(200).json({ ping: "success" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.use("/api", usersRoutes);
app.use("/api", moviesRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
