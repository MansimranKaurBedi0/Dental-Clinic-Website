import { useEffect, useState } from "react";
import { AdminCards } from "./AdminCards";

export function Admin() {
  const [appointment, setAppointment] = useState([]);
  async function handleData() {
    const res = await fetch("http://localhost:3000/user/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsed = await res.json();
    setAppointment(parsed);
  }
  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      <div
        className="adminDiv"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          margin: "30px",
        }}
      >
        {appointment.map((item) => {
          return (
            <AdminCards
              _id={item._id}
              key={item._id}
              name={item.name}
              email={item.email}
              phone={item.phone}
              date={item.date}
              time={item.time}
              message={item.message}
              status={item.status}
            ></AdminCards>
          );
        })}
      </div>
    </>
  );
}
