import "./../styles/BookingSuccess.css";

import { Link } from "react-router-dom";

function BookingSuccess() {
  return (
    <main className="booking-success">

      <div className="success-content">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Booking Successful!
        </h1>

        <p>
          Your booking has been confirmed.
        </p>

        <Link
          to="/services"
          className="success-button"
        >
          Book Another Service
        </Link>

      </div>

    </main>
  );
}

export default BookingSuccess;