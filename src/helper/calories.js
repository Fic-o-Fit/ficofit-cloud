const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");
const MODEL_URL = require("../helper/model.json");

async function runModel() {
  await tf.loadLayersModel(MODEL_URL);
  console.log(model.summary());
}

function countCaloriesBurned(weight, reps) {
  input = tf.tensor2d([weight / 100.0], [1, 1]);
  result = window.model.predict(input);
  cal_per_rep = result.dataSync();
  cal_per_rep = Math.round(cal_per_rep[0] * 10000) / 10000;
  return (cal_burned = cal_per_rep * reps);
}

// const result = countCaloriesBurned(weight, reps);

module.exports = { countCaloriesBurned, runModel };
