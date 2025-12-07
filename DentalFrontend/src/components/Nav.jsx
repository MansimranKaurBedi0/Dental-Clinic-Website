import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Nav() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check login status on page load
  async function checkLogin() {
    const res = await fetch("http://localhost:3000/user/check", {
      credentials: "include",
    });
    const data = await res.json();
    setLoggedIn(data.loggedIn);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  // Logout handler
  async function handleLogout() {
    const res = await fetch("http://localhost:3000/user/logout", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    alert(data.msg);
    setLoggedIn(false);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Brand Logo */}
          <Link className="navbar-brand" to="/">
            Dental
          </Link>

          {/* Mobile toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/services">
                  Services
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/appointment">
                  Appointment
                </Link>
              </li>
              {loggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/myappointments">
                    My Appointments
                  </Link>
                </li>
              )}

              {/* Show LOGIN + SIGNUP if NOT logged in */}
              {!loggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                </>
              )}

              {/* Show LOGOUT if logged in */}
              {loggedIn && (
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger ms-3"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Admin Link */}
          <div>
            <Link
              to="/admin"
              style={{
                color: "black",
                textDecoration: "none",
                marginLeft: "20px",
              }}
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
