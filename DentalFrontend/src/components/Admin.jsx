import { useEffect, useState } from "react";
import { AdminCards } from "./AdminCards";

export function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const cardStyle = {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f2f2f2",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  // ⭐ Load all appointments (Admin Only)
  async function loadAppointments() {
    try {
      const res = await fetch("http://localhost:3000/appointment/view", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.log("Error fetching admin appointments", err);
    }
  }

  // ⭐ Load once on page mount
  useEffect(() => {
    loadAppointments();
  }, []);

  // ⭐ Dashboard stats
  const total = appointments.length;
  const accepted = appointments.filter((a) => a.status === "accepted").length;
  const declined = appointments.filter((a) => a.status === "declined").length;

  const today = appointments.filter((a) => {
    const todayDate = new Date().toISOString().split("T")[0];
    return a.date === todayDate;
  }).length;

  // ⭐ Search Filter
  const searched = appointments.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ⭐ Status Filter
  const finalFiltered = searched.filter((item) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "pending")
      return !item.status || item.status === "pending";
    return item.status === statusFilter;
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Panel</h1>

      {/* ⭐ DASHBOARD SUMMARY CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          margin: "20px 0",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Appointments</h3>
          <p>{total}</p>
        </div>

        <div style={cardStyle}>
          <h3>Accepted</h3>
          <p>{accepted}</p>
        </div>

        <div style={cardStyle}>
          <h3>Declined</h3>
          <p>{declined}</p>
        </div>

        <div style={cardStyle}>
          <h3>Today</h3>
          <p>{today}</p>
        </div>
      </div>

      {/* ⭐ SEARCH + FILTERS */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <option value="all">All</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* ⭐ GRID OF APPOINTMENT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {finalFiltered.map((item) => (
          <AdminCards
            key={item._id}
            _id={item._id}
            name={item.name}
            email={item.email}
            phone={item.phone}
            date={item.date}
            time={item.time}
            message={item.message}
            status={item.status}
            refresh={loadAppointments} // ⭐ Refresh after accept/decline
          />
        ))}
      </div>
    </div>
  );
}
