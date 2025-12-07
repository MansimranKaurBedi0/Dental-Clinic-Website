export function AdminCards(props) {
  //Handle Accept
  async function handleAccept() {
    const res = await fetch(
      `http://localhost:3000/appointment/accept/${props._id}`,
      {
        method: "PUT",
        credentials: "include", // ⭐ IMPORTANT
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) alert("Appointment Accepted ✅");
  }

  //Handle Decline
  async function handleDecline() {
    const res = await fetch(
      `http://localhost:3000/appointment/decline/${props._id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.ok) alert("Appointment Decline ✅");
  }
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>

          <p className="card-text">Appointment Date: {props.date}</p>
          <br></br>
          <p className="card-text">Appointment time: {props.time}</p>
          <br></br>
          <p className="card-text">Appointment Status:{props.status}</p>
          <br></br>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </>
  );
}
