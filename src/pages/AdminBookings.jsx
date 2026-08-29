import "./../styles/AdminBookings.css";

import { useEffect, useState } from "react";
import axios from "axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/bookings"
        );

        setBookings(response.data);
      } catch (error) {
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <main className="admin-bookings">
        <h1>Bookings</h1>
        <p>Loading bookings...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="admin-bookings">
        <h1>Bookings</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="admin-bookings">
      <div className="admin-header">
        <div>
          <p className="admin-label">
            ADMIN
          </p>

          <h1>Bookings</h1>
        </div>

        <p>
          {bookings.length} bookings
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-bookings">
          <p>No bookings yet.</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div
              className="booking-card"
              key={booking.id}
            >
              <div className="booking-card-header">
                <h2>
                  {booking.service_name}
                </h2>

                <span
                  className={`status ${booking.status}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="booking-customer">
                <p>
                  <strong>
                    {booking.customer_name}
                  </strong>
                </p>

                <p>
                  {booking.email}
                </p>

                <p>
                  {booking.phone}
                </p>
              </div>

              <div className="booking-details">
                <span>
                  📅 {booking.booking_date}
                </span>

                <span>
                  🕐 {booking.booking_time}
                </span>

                <span>
                  ฿
                  {Number(
                    booking.price
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default AdminBookings;