const express = require("express");
const router = express.Router();
const axios = require("axios");

// POST /voice
router.post("/", async (req, res) => {
  const { text, voice } = req.body;

  try {
    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/voice",
      {
        text,
        voice: voice || "Rachel"
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY
        },
        responseType: "arraybuffer"
      }
    );

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "ElevenLabs API call failed" });
  }
});

module.exports = router;
