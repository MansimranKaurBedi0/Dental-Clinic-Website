import { useEffect, useState } from "react";

export function MyAppointments() {
  const [apps, setApps] = useState([]);

  async function fetchMyAppointments() {
    const res = await fetch(
      "http://localhost:3000/appointment/myAppointments",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await res.json();
    setApps(data);
  }

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Appointments</h2>
      <hr />

      {apps.length === 0 && <p>No Appointments Found</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        {apps.map((a) => (
          <div
            key={a._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            <h4>
              {a.date} at {a.time}
            </h4>
            <p>
              <b>Status:</b> {a.status}
            </p>
            <p>
              <b>Message:</b> {a.message || "No Message"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
