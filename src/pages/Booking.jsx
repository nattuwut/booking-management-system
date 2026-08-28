import "./../styles/Booking.css";

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [error, setError] = useState("");


  const serviceId = Number(
    searchParams.get("service")
  );

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/services"
        );

        setServices(response.data);
      } catch (error) {
        setError("Failed to load services.");
      } finally {
        setLoadingServices(false);
      }
    }

    fetchServices();
  }, []);

  const selectedService = services.find(
    (service) => service.id === serviceId
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bookingDate: "",
    bookingTime: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required.";
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = "Date is required.";
    }

    if (!formData.bookingTime) {
      newErrors.bookingTime = "Time is required.";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          serviceId: serviceId,
          bookingDate: formData.bookingDate,
          bookingTime: formData.bookingTime,
        }
      );

      navigate("/booking/success");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to create booking."
      );
    }
  }

  if (loadingServices) {
    return (
      <main className="booking">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!selectedService) {
    return (
      <main className="booking">
        <h1>Invalid Service</h1>

        <p>
          Please select a valid service.
        </p>
      </main>
    );
  }

  return (
    <main className="booking">

      <div className="booking-header">

        <p>BOOKING</p>

        <h1>
          Book your service
        </h1>

      </div>

      <div className="booking-layout">

        <div className="booking-service">

          <h2>
            {selectedService.name}
          </h2>

          <p>
            {selectedService.duration} minutes
          </p>

          <strong>
            ฿{selectedService.price.toLocaleString()}
          </strong>

        </div>

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >

          <h2>
            Your Information
          </h2>

          <label>
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />

          {errors.name && (
            <p className="form-error">
              {errors.name}
            </p>
          )}

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />

          {errors.email && (
            <p className="form-error">
              {errors.email}
            </p>
          )}

          <label>
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="08xxxxxxxx"
          />

          {errors.phone && (
            <p className="form-error">
              {errors.phone}
            </p>
          )}

          <label>
            Date
          </label>

          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
          />

          {errors.bookingDate && (
            <p className="form-error">
              {errors.bookingDate}
            </p>
          )}

          <label>
            Time
          </label>

          <input
            type="time"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
          />

          {errors.bookingTime && (
            <p className="form-error">
              {errors.bookingTime}
            </p>
          )}

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="booking-button"
          >
            Confirm Booking
          </button>

        </form>

      </div>

    </main>
  );
}

export default Booking;