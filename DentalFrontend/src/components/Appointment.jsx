import { useState } from "react";

export function Appointment() {
  const [name, setName] = useState("");
  function handleName(e) {
    setName(e.target.value);
  }
  const [email, setEmail] = useState("");
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  const [phone, setPhone] = useState("");
  function handlePhone(e) {
    setPhone(e.target.value);
  }
  const [date, setDate] = useState("");
  function handleDate(e) {
    setDate(e.target.value);
  }
  const [time, setTime] = useState("");
  function handleTime(e) {
    setTime(e.target.value);
  }
  const [message, setMessage] = useState("");
  function handleMessage(e) {
    setMessage(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      name,
      email,
      phone,
      date,
      time,
      message,
    };
    const data = await fetch("http://localhost:3000/user/appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const parsed = await data.json();
    if (data.ok) {
      alert("Appointment sent sucessfully");
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setMessage("");
    } else {
      alert("Failed to book appointment!" + parsed.errors[0].msg);
    }
  }
  return (
    <>
      <div
        style={
          {
            // backgroundImage:
            //   'url("https://i.pinimg.com/736x/0e/e6/33/0ee6333097bc3ff577ac21fd385a4b27.jpg")',
            // backgroundSize: "cover", // image cover kare pura div
            // backgroundPosition: "center",
          }
        }
      >
        <h1 style={{ marginLeft: "25%", marginTop: "70px", fontSize: "70px" }}>
          Book Your Appointment
        </h1>
        <div style={{ display: "flex" }}>
          <form
            style={{
              marginTop: "2%",
              width: "50%",
              marginLeft: "13%",
            }}
            onSubmit={handleSubmit}
          >
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputName"
                onChange={handleName}
                value={name}
                backgroundColor="#bde1df"
                style={{
                  boxShadow: "1px 1px 1px 1px #b12d51",
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail"
                onChange={handleEmail}
                value={email}
                backgroundColor="#bde1df"
                style={{
                  boxShadow: "1px 1px 1px 1px #b12d51",
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Phone
              </label>
              <input
                type="phone"
                class="form-control"
                id="exampleInputPhone"
                onChange={handlePhone}
                value={phone}
                backgroundColor="#bde1df"
                style={{
                  boxShadow: "1px 1px 1px 1px #b12d51",
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Date
              </label>
              <input
                type="date"
                class="form-control"
                id="exampleInputDate"
                onChange={handleDate}
                value={date}
                backgroundColor="#bde1df"
                style={{
                  boxShadow: "1px 1px 1px 1px #b12d51",
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Time
              </label>
              <input
                type="time"
                class="form-control"
                id="exampleInputTime"
                onChange={handleTime}
                value={time}
                backgroundColor="#bde1df"
                style={{
                  boxShadow: "1px 1px 1px 1px #b12d51",
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Message
              </label>
              <input
                type="message"
                class="form-control"
                id="exampleInputMessage"
                onChange={handleMessage}
                value={message}
                backgroundColor="#bde1df"
                style={{
                  boxShadow: "1px 1px 1px 1px #b12d51",
                }}
              />
            </div>
            <button
              type="submit"
              class="btn "
              style={{ backgroundColor: "#b12d51" }}
            >
              Submit
            </button>
          </form>
          <div style={{ paddingTop: "210px" }}>
            <img src="https://i.pinimg.com/736x/86/fd/ca/86fdcaa6ed1dd737acdadc641f821fce.jpg"></img>
          </div>
        </div>
      </div>
    </>
  );
}
