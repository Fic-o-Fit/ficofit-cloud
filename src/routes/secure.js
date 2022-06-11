const express = require("express");
const userModel = require("../model/userModel");
const router = express.Router();
const { getCookieEmail } = require("../helper/cookie");

router.get("/profile", async (req, res, next) => {
  let emailSession = getCookieEmail(req);
  const user = await userModel.find(
    { email: emailSession },
    "_id name email gender height weight highScore"
  );

  res.status(200);
  res.json(user[0]);
});

router.post("/calories-counter", async (req, res, next) => {
  const tf = require("@tensorflow/tfjs");
  const tfnode = require("@tensorflow/tfjs-node");
  let emailSession = getCookieEmail(req);

  const { reps } = req.body;
  const userInfo = await userModel
    .findOne({ email: emailSession }, "name weight -_id")
    .limit(1);

  if (userInfo.weight === 0) {
    res.status(400);
    res.json({
      weight: "Weight is empty, you need to update with correct data",
    });
  }

  if (userInfo.weight > 30) {
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
  }
});

router.post("/submit-score", async (req, res, next) => {
  let emailSession = getCookieEmail(req);
  const { score } = req.body;
  await userModel.updateOne({ email: emailSession }, { highScore: score });
  res.status(200);
  res.json({ status: "Score has been saved" });
});

router.get("/score", async (req, res, next) => {
  const users = await userModel
    .find({}, "name email highScore _id")
    .sort({ highScore: -1 });
  // .limit(10);
  let leaderboardScore = users.map((user, index) => ({
    position: index + 1,
    name: user.name,
    email: user.email,
    score: user.highScore,
  }));
  res.status(200);
  res.json(leaderboardScore);
});

router.get("/score/me", async (req, res, next) => {
  let _email = await getCookieEmail(req);
  const users = await userModel
    .find({}, "name email highScore -_id")
    .sort({ highScore: -1 });
  // .limit(10);
  const user = await userModel.find({ email: _email }, "name email highScore");
  let index = await users.findIndex((user) => user.email === _email);

  res.status(200);
  res.json({
    position: index + 1,
    name: user[0].name,
    email: _email,
    score: user[0].highScore,
  });
});

router.post("/submit-weight", async (req, res, next) => {
  let emailSession = getCookieEmail(req);
  const { weight } = req.body;

  await userModel.updateOne({ email: emailSession }, { weight: weight });
  res.status(200);
  res.json({ status: "Weight has been saved" });
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
