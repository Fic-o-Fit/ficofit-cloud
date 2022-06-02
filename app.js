require("dotenv").config();
let exec = require("child_process").exec;
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const mainRoutes = require("./src/routes/main");
const secureRoutes = require("./src/routes/secure");
const app = express();
require("./src/auth/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const uri = process.env.MONGO_CONNECTION_URL;
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.on("error", (error) => {
  console.log(error);
  process.exit(1);
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
});

app.use("/", mainRoutes);
app.use("/", passport.authenticate("jwt", { session: false }), secureRoutes);

app.use((req, res, next) => {
  res.status(404);
  res.json({ message: "Page not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

const port = 6000;
const command = "curl ifconfig.me";

app.listen(port, () => {
  exec(command, (error, stdout, stderr) => {
    console.log(`Server started on ${stdout} port ${port}`);
  });
});
