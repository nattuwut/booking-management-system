import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <div className="service-card">

      <div className="service-card-content">

        <h3>{service.name}</h3>

        <p>{service.description}</p>

        <div className="service-card-info">

          <strong>
            ฿{service.price.toLocaleString()}
          </strong>

          <span>
            {service.duration} min
          </span>

        </div>

      </div>

      <Link
        to={`/booking?service=${service.id}`}
        className="service-card-button"
      >
        Book Now
      </Link>

    </div>
  );
}

export default ServiceCard;