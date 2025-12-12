import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg);
      return;
    }

    alert("Login Successful");

    // 🔥 notify Navbar to refresh login state
    localStorage.setItem("refreshNav", "true");

    // redirect
    window.location.href = "/";
  }

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{ width: "300px", margin: "auto", marginTop: "20px" }}
      >
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
