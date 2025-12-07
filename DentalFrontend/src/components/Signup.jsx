import { useState } from "react";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      credentials: "include", // ⭐ cookie here
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup Successful 🎉");
    } else {
      alert(data.msg || "Signup failed");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Signup</h2>

      <form onSubmit={handleSignup}>
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: "#b12d51", color: "white" }}
        >
          Signup
        </button>
      </form>
    </div>
  );
}
