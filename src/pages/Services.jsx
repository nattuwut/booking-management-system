import "./../styles/Services.css";

import ServiceCard from "./../components/ServiceCard";

const services = [
  {
    id: 1,
    name: "Haircut",
    description:
      "Professional haircut from our experienced staff.",
    price: 300,
    duration: 30,
  },
  {
    id: 2,
    name: "Hair Coloring",
    description:
      "Give your hair a fresh new look with professional coloring.",
    price: 800,
    duration: 90,
  },
  {
    id: 3,
    name: "Hair Treatment",
    description:
      "Restore and care for your hair with our treatment service.",
    price: 500,
    duration: 60,
  },
  {
    id: 4,
    name: "Hair Styling",
    description:
      "Get a professional hairstyle for any occasion.",
    price: 400,
    duration: 45,
  },
];

function Services() {
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