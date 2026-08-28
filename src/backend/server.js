const express = require("express");
const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");

const serviceRoutes = require("./routes/serviceRoutes");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use(
  "/api/services",
  serviceRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});