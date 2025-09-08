import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(res.data.msg);
      localStorage.setItem("reset_email", email);
      navigate("/verify-otp");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error sending OTP");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          {message && <p className="auth-message">{message}</p>}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send OTP</button>
        </form>
      </div>
    </div>
  );
}
