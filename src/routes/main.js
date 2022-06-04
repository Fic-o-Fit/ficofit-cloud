const express = require("express");
const router = express.Router();

const userModel = require("../model/userModel");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const tokenList = [];

router.get("/status", (req, res, next) => {
  res.status(200);
  res.json({ status: "ok" });
});

router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;
  const userInfo = await userModel.findOne({ email: email });

  if (userInfo) {
    res.status(400).json({ status: "Email already registered" });
  }

  if (!userInfo) {
    userModel.create({ email, password, name });
    res.status(200).json({ status: "signup successful" });
  }
});

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
          expiresIn: 1800,
        });
        const refreshToken = jwt.sign({ user: body }, "top-secret-refresh", {
          expiresIn: 86400,
        });

        res.cookie("emailSession", user.email);
        res.cookie("jwt", token);
        res.cookie("refreshJwt", refreshToken);

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
    res.json({ message: "Unauthorized" });
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
  res.json({ message: "logged out" });
});

module.exports = router;
