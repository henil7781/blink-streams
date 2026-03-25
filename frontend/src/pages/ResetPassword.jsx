import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message || res.data.msg || "Password reset successful");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || err.response?.data?.msg || "Error resetting password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Set New Password</h2>
          {message && <p className="auth-message">{message}</p>}

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
