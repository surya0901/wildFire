const express = require("express");
const router = express.Router();
const weather = require("../data/weather.json");
const population = require("../data/population.json");
const centers = require("../data/centers.json");
const riskCalc = require("../utils/riskCalc");

// GET /risk-score/:zipcode
router.get("/:zipcode", (req, res) => {
  const { zipcode } = req.params;

  const weatherData = weather[zipcode];
  const popData = population[zipcode];
  const centerList = centers[zipcode];

  if (!weatherData || !popData) {
    return res.status(404).json({ error: "Zipcode not found in dataset" });
  }

  const risk_score = riskCalc(popData, weatherData);

  res.json({
    zipcode,
    city: weatherData.city,
    temperature_F: weatherData.temperature_F,
    humidity_percent: weatherData.humidity_percent,
    heat_index_F: weatherData.heat_index_F,
    risk_score,
    risk_level: risk_score > 80 ? "Severe" : risk_score > 60 ? "High" : "Moderate",
    nearest_cooling_center: centerList ? centerList[0] : null
  });
});

module.exports = router;
