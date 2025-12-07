import "./App.css";
import { Admin } from "./components/Admin";
import { Appointment } from "./components/Appointment";
import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import { Service } from "./components/Service";
import { Login } from "./components/Login"; // ⭐ new
import { Signup } from "./components/Signup";
import { MyAppointments } from "./components/MyAppointments";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/services" element={<Service />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} /> {/* ⭐ new */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/myappointments" element={<MyAppointments />} />
      </Routes>
    </>
  );
}

export default App;
