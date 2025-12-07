import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      credentials: "include", // ⭐ COOKIE YAHAN SE SET HOGI
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Login successful ✅");
      console.log("User:", data.user);
      // yahan tu navigate bhi kar sakti hai e.g. admin ya home
    } else {
      alert(data.msg || "Login failed");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: "#b12d51", color: "white" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
