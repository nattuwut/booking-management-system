import "./../styles/Home.css";

import { Link } from "react-router-dom";

function Home() {
    return (
        <main className="home">

            <section className="hero">

                <div className="hero-content">

                    <p className="hero-label">
                        BOOKLY
                    </p>

                    <h1>
                        Book your time.
                        <br />
                        We'll handle the rest.
                    </h1>

                    <p className="hero-description">
                        Book your favorite services quickly
                        and easily.
                    </p>

                    <Link
                        to="/services"
                        className="hero-button"
                    >
                        Book a Service
                    </Link>

                </div>

            </section>

            <section className="features">

                <h2>
                    Why choose Bookly?
                </h2>

                <div className="feature-grid">

                    <div className="feature-card">
                        <h3>
                            Easy Booking
                        </h3>

                        <p>
                            Choose a service and book
                            your time in just a few steps.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>
                            Flexible
                        </h3>

                        <p>
                            Choose the date and time
                            that works best for you.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>
                            Simple
                        </h3>

                        <p>
                            No complicated process.
                            Just choose, book, and you're done.
                        </p>
                    </div>

                </div>

            </section>

            <section className="popular-services">

                <div className="section-heading">
                    <p>OUR SERVICES</p>

                    <h2>
                        Popular Services
                    </h2>

                    <span>
                        Choose a service that works for you.
                    </span>
                </div>

                <div className="service-preview-grid">

                    <div className="service-preview-card">
                        <h3>Haircut</h3>

                        <p>
                            Professional haircut from our
                            experienced staff.
                        </p>

                        <strong>฿300</strong>
                    </div>

                    <div className="service-preview-card">
                        <h3>Hair Coloring</h3>

                        <p>
                            Give your hair a fresh new look
                            with professional coloring.
                        </p>

                        <strong>฿800</strong>
                    </div>

                    <div className="service-preview-card">
                        <h3>Hair Treatment</h3>

                        <p>
                            Restore and care for your hair
                            with our treatment service.
                        </p>

                        <strong>฿500</strong>
                    </div>

                </div>

                <div className="popular-services-action">

                    <Link
                        to="/services"
                        className="secondary-button"
                    >
                        View All Services
                    </Link>

                </div>

            </section>

        </main>
    );
}

export default Home;