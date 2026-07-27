import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await api.post("/register/user", { email, password });
      setMessage(response.data.message || "Registration successful!");
      setTimeout(() => navigate("/afterlogin"), 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong. Try again.";
      setError(errorMessage);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className="register-form">
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
        <h3>
          Already have an account?{" "}
          <a
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </a>
        </h3>
        {error && <div className="message">{error}</div>}
      </form>
      {error && <div className="message">{error}</div>}
      {message && <div className="message">{message}</div>}
    </>
  );
}
