const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/services", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM services ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch services.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});