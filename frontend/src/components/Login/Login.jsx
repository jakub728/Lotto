import React from "react";
import "./Login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await api.post("/login/user/login", { email, password });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Login failed");
        return;
      }

      setMessage(result.message);
      setError("");
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/results");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong during login");
    }
  };

  return (
    <div>
      {!message ? (
        <form className="login-form" onSubmit={loginHandler}>
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Log in</button>
        </form>
      ) : (
        <div className="message-div">
          <p className="message">{message}</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
