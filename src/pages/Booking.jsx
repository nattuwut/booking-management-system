import "./../styles/Booking.css";

import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: 1,
    name: "Haircut",
    price: 300,
    duration: 30,
  },
  {
    id: 2,
    name: "Hair Coloring",
    price: 800,
    duration: 90,
  },
  {
    id: 3,
    name: "Hair Treatment",
    price: 500,
    duration: 60,
  },
  {
    id: 4,
    name: "Hair Styling",
    price: 400,
    duration: 45,
  },
];

function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  const serviceId = Number(
    searchParams.get("service")
  );

  const selectedService = services.find(
    (service) => service.id === serviceId
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
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

    if (!formData.date) {
      newErrors.date = "Date is required.";
    }

    if (!formData.time) {
      newErrors.time = "Time is required.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log({
      service: selectedService,
      customer: formData,
    });

    navigate("/booking/success");
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
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          {errors.date && (
            <p className="form-error">
              {errors.date}
            </p>
          )}

          <label>
            Time
          </label>

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />

          {errors.time && (
            <p className="form-error">
              {errors.time}
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