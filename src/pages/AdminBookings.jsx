import "./../styles/AdminBookings.css";

import { useEffect, useState } from "react";
import axios from "axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("date-asc");

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

  const filteredBookings = bookings
    .filter((booking) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        booking.customer_name
          .toLowerCase()
          .includes(searchText) ||
        booking.email
          .toLowerCase()
          .includes(searchText) ||
        booking.service_name
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "all" ||
        booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(
        `${a.booking_date.slice(0, 10)}T${a.booking_time}`
      );

      const dateB = new Date(
        `${b.booking_date.slice(0, 10)}T${b.booking_time}`
      );

      if (sort === "date-desc") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

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
          {filteredBookings.length} of {bookings.length} bookings
        </p>
      </div>

      {bookings.length > 0 && (
        <div className="booking-controls">

          <input
            type="text"
            placeholder="Search customer, email, or service..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="all">
              All Status
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="confirmed">
              Confirmed
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="date-asc">
              Date: Oldest First
            </option>

            <option value="date-desc">
              Date: Newest First
            </option>
          </select>

        </div>
      )}

      {bookings.length === 0 ? (

        <div className="empty-bookings">
          <p>No bookings yet.</p>
        </div>

      ) : filteredBookings.length === 0 ? (

        <div className="empty-bookings">
          <p>No bookings found.</p>
        </div>

      ) : (

        <div className="bookings-list">

          {filteredBookings.map((booking) => (
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