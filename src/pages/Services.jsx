import "./../styles/Services.css";

import { useEffect, useState } from "react";

import axios from "axios";

import ServiceCard from "./../components/ServiceCard";



function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  if (loading) {
    return (
      <main className="services">
        <p>Loading services...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="services">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="services">

      <section className="services-header">

        <p>OUR SERVICES</p>

        <h1>
          Choose a service
        </h1>

        <span>
          Select the service you'd like to book.
        </span>

      </section>

      <section className="services-grid">

        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
          />
        ))}

      </section>

    </main>
  );
}

export default Services;