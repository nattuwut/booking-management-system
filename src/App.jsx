import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import BookingSuccess from "./pages/BookingSuccess";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/booking"
          element={<Booking />}
        />

        <Route
          path="/booking/success"
          element={<BookingSuccess />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;