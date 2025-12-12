import { Link, Outlet } from "react-router-dom";

export function AdminLayout() {
  const sidebarStyle = {
    width: "220px",
    backgroundColor: "#2f3542",
    color: "white",
    height: "100vh",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
  };

  const linkStyle = {
    display: "block",
    color: "white",
    textDecoration: "none",
    padding: "12px 0",
    fontSize: "18px",
  };

  const contentStyle = {
    marginLeft: "240px",
    padding: "20px",
  };

  return (
    <div>
      {/* SIDEBAR */}
      <div style={sidebarStyle}>
        <h2 style={{ color: "white", marginBottom: "20px" }}>Admin Panel</h2>

        <Link to="/admin" style={linkStyle}>Dashboard</Link>
        <Link to="/admin/appointments" style={linkStyle}>Appointments</Link>
        <Link to="/admin/services" style={linkStyle}>Services</Link>
        <Link to="/admin/patients" style={linkStyle}>Patients</Link>
        <Link to="/admin/settings" style={linkStyle}>Settings</Link>
      </div>

      {/* MAIN CONTENT */}
      <div style={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
}
