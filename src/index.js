require("dotenv").config();
const express = require("express");
const usersRoutes = require("./routes/users");
const moviesRoutes = require("./routes/movies");
const morgan = require("morgan");

const PORT = process.env.PORT || 2000;
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use(usersRoutes);
app.use(moviesRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
