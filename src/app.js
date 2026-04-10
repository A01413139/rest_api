const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(morgan("dev"));
app.use(express.json());

app.use(require("./routes/index.routes"));
app.use("/users", require("./routes/users.routes"));
app.use(require("./routes/login.routes"));

module.exports = app;