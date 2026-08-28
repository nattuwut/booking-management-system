const pool = require("../db");

async function getServices(req, res) {
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
}

async function getServiceById(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM services WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch service.",
    });
  }
}

module.exports = {
  getServices,
  getServiceById,
};