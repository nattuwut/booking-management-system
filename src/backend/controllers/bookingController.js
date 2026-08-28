const pool = require("../db");

async function createBooking(req, res) {
  try {
    const {
      name,
      email,
      phone,
      serviceId,
      bookingDate,
      bookingTime,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !serviceId ||
      !bookingDate ||
      !bookingTime
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const customerResult = await pool.query(
      `
      INSERT INTO customers
      (name, email, phone)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, email, phone]
    );

    const customer = customerResult.rows[0];

    const bookingResult = await pool.query(
      `
      INSERT INTO bookings
      (
        customer_id,
        service_id,
        booking_date,
        booking_time
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        customer.id,
        serviceId,
        bookingDate,
        bookingTime,
      ]
    );

    res.status(201).json({
      message: "Booking created successfully.",
      booking: bookingResult.rows[0],
      customer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create booking.",
    });
  }
}

module.exports = {
  createBooking,
};