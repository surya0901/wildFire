const express = require("express");
const router = express.Router();
const centers = require("../data/centers.json");

// GET /cooling-centers/:zipcode
router.get("/:zipcode", (req, res) => {
  const { zipcode } = req.params;
  const centerList = centers[zipcode];

  if (!centerList) {
    return res.status(404).json({ error: "No centers found for this zipcode" });
  }

  res.json(centerList);
});

module.exports = router;
