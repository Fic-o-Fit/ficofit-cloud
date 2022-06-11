const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const userModel = require("../model/userModel");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const tokenList = [];

router.get("/status", (req, res, next) => {
  res.status(200);
  res.json({ status: "ok" });
});

router.post(
  "/signup",
  [
    check("name", "Please Enter a Valid name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let { name, email, password } = req.body;
    email = email.toLowerCase();
    try {
      let user = await userModel.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          message: "Sorry, user already exists",
        });
      }
      await userModel.create({ name, email, password });
      res.status(200).json({ status: "Signup successful" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error occured when saving user data");
    }
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (!user || err) {
        let _message = info.message;
        res.status(404);
        res.json({ message: _message });
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        let _message = info.message;
        if (error) return next(error);

        const body = {
          _id: user._id,
          email: user.email,
        };

        const token = jwt.sign({ user: body }, "top-secret", {
          expiresIn: 300,
        });
        const refreshToken = jwt.sign({ user: body }, "top-secret-refresh", {
          expiresIn: 86400,
        });

        res.cookie("emailSession", user.email);
        res.cookie("jwt", token);
        res.cookie("refreshJwt", refreshToken);
        res.cookie("Content-Type", "application/json");

        tokenList[refreshToken] = {
          token,
          refreshToken,
          email: user.email,
          _id: user._id,
        };

        return res.status(200).json({ message: _message, token, refreshToken });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post("/token", (req, res, info) => {
  const { email, refreshToken } = req.body;
  if (refreshToken in tokenList && tokenList[refreshToken].email === email) {
    const body = { email, _id: tokenList[refreshToken]._id };
    const token = jwt.sign({ user: body }, "top-secret", { expiresIn: 300 });

    res.cookie("jwt", token);
    tokenList[refreshToken].token = token;

    res.status(200);
    res.json({ token });
  } else {
    res.status(401);
    res.json({ message: "User has to be authenticated first" });
  }
});

router.post("/logout", (req, res) => {
  if (req.cookies) {
    const refreshToken = req.cookies["refreshJwt"];
    if (refreshToken in tokenList) delete tokenList[refreshToken];
    res.clearCookie("refreshJwt");
    res.clearCookie("jwt");
  }

  res.status(200);
  res.json({ message: "User has been logged out successfully" });
});

module.exports = router;
