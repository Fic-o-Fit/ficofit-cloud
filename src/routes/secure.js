const express = require("express");
const userModel = require("../model/userModel");
const router = express.Router();

router.post("/calories-burn", async (req, res, next) => {
  const tf = require("@tensorflow/tfjs");
  const tfnode = require("@tensorflow/tfjs-node");

  const { email, reps } = req.body;
  const userInfo = await userModel
    .findOne({ email }, "name weight -_id")
    .limit(1);

  const handler = tfnode.io.fileSystem(process.env.MODEL_JSON_URL);
  let model = await tf.loadLayersModel(handler);

  let input = tf.tensor2d([userInfo.weight / 100.0], [1, 1]);
  let result = model.predict(input);
  let cal_per_rep = result.dataSync();
  cal_per_rep = Math.round(cal_per_rep[0] * 10000) / 10000;
  let cal_burned = cal_per_rep * reps;

  res.status(200);
  res.json({
    user: userInfo.name,
    weight: userInfo.weight,
    reps: reps,
    calories_burn: cal_burned,
  });
});

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

router.post("/submit-weight", async (req, res, next) => {
  const { email, weight } = req.body;
  await userModel.updateOne({ email }, { weight: weight });
  res.status(200);
  res.json({ status: "ok" });
});

router.get("/calories", async (req, res, next) => {
  const users = await userModel
    .find({}, "name calories -_id")
    .sort({ calories: -1 })
    .limit(10);
  res.status(200);
  res.json(users);
});

module.exports = router;
