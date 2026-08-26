import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">
        Bookly
      </Link>

      <div>
        <Link to="/">
          Home
        </Link>

        <Link to="/services">
          Services
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;