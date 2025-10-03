const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini client with API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /summary
router.post("/", async (req, res) => {
  const { city, heat_index_F, risk_score, risk_level, nearest_cooling_center } = req.body;

  if (!city || !heat_index_F || !risk_score || !risk_level) {
    return res.status(400).json({ error: "Missing required fields in request body" });
  }

  try {
    // Build the prompt
    const prompt = `
Summarize this data into a personalized heat risk warning in plain English at about an 8th grade reading level.
Be short, clear, and actionable. Include one action and one cooling center suggestion.

Data:
- City: ${city}
- Heat Index: ${heat_index_F}°F
- Risk Score: ${risk_score} (${risk_level})
- Cooling Center: ${nearest_cooling_center?.name}, open ${nearest_cooling_center?.hours_open}
    `;

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    const summary = result.response.text();

    res.json({ summary });
  } catch (err) {
    console.error("Gemini API error:", err.message);
    res.status(500).json({ error: "Gemini API call failed" });
  }
});

module.exports = router;
