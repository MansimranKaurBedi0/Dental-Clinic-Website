import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Nav() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // ---------------- CHECK LOGIN ----------------
  async function checkLogin() {
    try {
      const res = await fetch("http://localhost:3000/user/check", {
        credentials: "include",
      });
      const data = await res.json();

      setLoggedIn(data.loggedIn);

      if (data.loggedIn) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Login check failed");
    }
  }

  // Run once on page load
  useEffect(() => {
    checkLogin();
  }, []);

  // ---------------- AUTO UPDATE NAV AFTER LOGIN ----------------
  useEffect(() => {
    function updateNav() {
      if (localStorage.getItem("refreshNav") === "true") {
        checkLogin(); // re-check login instantly
        localStorage.removeItem("refreshNav");
      }
    }

    window.addEventListener("storage", updateNav);

    return () => window.removeEventListener("storage", updateNav);
  }, []);

  // ---------------- LOGOUT ----------------
  async function handleLogout() {
    await fetch("http://localhost:3000/user/logout", {
      method: "POST",
      credentials: "include",
    });

    setLoggedIn(false);
    setUser(null);

    localStorage.setItem("refreshNav", "true"); // update nav instantly

    window.location.href = "/";
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Dental
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* NAV LINKS */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">

              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/appointment">Appointment</Link>
              </li>

              {loggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/myappointments">
                    My Appointments
                  </Link>
                </li>
              )}

              {!loggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
                </>
              )}

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

          {/* ⭐ ADMIN BUTTON — SHOW ONLY IF ROLE = admin ⭐ */}
          {user?.role === "admin" && (
            <div>
              <Link
                to="/admin"
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginLeft: "20px",
                  fontWeight: "bold",
                }}
              >
                Admin
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
