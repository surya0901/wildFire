const express = require("express");
const dotenv = require("dotenv");

dotenv.config(); // load .env
const app = express();

app.use(express.json());

// ROUTES
app.use("/summary", require("./routes/summary"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
