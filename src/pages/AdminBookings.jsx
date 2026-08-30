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

  async function updateStatus(id, status) {
    try {
      await axios.patch(
        `http://localhost:5000/api/bookings/${id}/status`,
        {
          status,
        }
      );

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id
            ? {
              ...booking,
              status,
            }
            : booking
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to update booking status."
      );
    }
  }

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

              <div className="booking-actions">

                {booking.status === "pending" && (
                  <>
                    <button
                      className="confirm-button"
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "confirmed"
                        )
                      }
                    >
                      Confirm
                    </button>

                    <button
                      className="cancel-button"
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "cancelled"
                        )
                      }
                    >
                      Cancel
                    </button>
                  </>
                )}

                {booking.status === "confirmed" && (
                  <button
                    className="cancel-button"
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        "cancelled"
                      )
                    }
                  >
                    Cancel Booking
                  </button>
                )}

                {booking.status === "cancelled" && (
                  <button
                    className="confirm-button"
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        "confirmed"
                      )
                    }
                  >
                    Confirm Again
                  </button>
                )}

              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default AdminBookings;