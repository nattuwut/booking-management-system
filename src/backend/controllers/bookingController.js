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

async function getBookings(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        bookings.id,
        customers.name AS customer_name,
        customers.email,
        customers.phone,
        services.name AS service_name,
        services.price,
        services.duration,
        bookings.booking_date,
        bookings.booking_time,
        bookings.status,
        bookings.created_at
      FROM bookings
      JOIN customers
        ON bookings.customer_id = customers.id
      JOIN services
        ON bookings.service_id = services.id
      ORDER BY
        bookings.booking_date ASC,
        bookings.booking_time ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch bookings.",
    });
  }
}

module.exports = {
  createBooking,
  getBookings,
};