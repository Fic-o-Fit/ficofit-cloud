const express = require("express");
const userModel = require("../model/userModel");

const router = express.Router();

router.post("/submit-score", async (req, res, next) => {
  const { email, score } = req.body;
  await userModel.updateOne({ email }, { highScore: score });
  res.status(200);
  res.json({ status: "ok" });
});

router.get("/score", async (req, res, next) => {
  const users = await userModel
    .find({}, "name highScore -_id")
    .sort({ highScore: -1 })
    .limit(10);
  res.status(200);
  res.json(users);
});

module.exports = router;
