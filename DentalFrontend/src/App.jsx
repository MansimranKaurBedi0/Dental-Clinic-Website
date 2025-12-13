import "./App.css";
import { Admin } from "./components/Admin";
import { Appointment } from "./components/Appointment";
import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import { Service } from "./components/Service";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { MyAppointments } from "./components/MyAppointments";
import { AdminLayout } from "./components/AdminLayout";  // ⭐ NEW

function App() {
  return (
    <>
      <Nav />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/services" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/myappointments" element={<MyAppointments />} />

        {/* ADMIN ROUTES WITH SIDEBAR */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />               {/* /admin */}
          <Route path="appointments" element={<Admin />} /> {/* /admin/appointments */}
          
          {/* FUTURE ROUTES */}
          {/* <Route path="services" element={<AdminServices />} /> */}
          {/* <Route path="patients" element={<AdminPatients />} /> */}
          {/* <Route path="settings" element={<AdminSettings />} /> */}
        </Route>

      </Routes>
    </>
  );
}

export default App;
