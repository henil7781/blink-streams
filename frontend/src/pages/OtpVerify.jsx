import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";

export default function OtpVerify() {
  const [otpDigits, setOtpDigits] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("reset_email");

  const handleChange = (val, idx) => {
    const arr = [...otpDigits];
    arr[idx] = val;
    setOtpDigits(arr);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otpDigits.join("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp: otpCode,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.removeItem("reset_email");
      navigate("/");
    } catch (err) {
      setMessage("Invalid OTP, please try again");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Enter OTP</h2>
          {message && <p className="auth-message">{message}</p>}
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            {otpDigits.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="otp-box"
                required
              />
            ))}
          </div>
          <button style={{ marginTop: "15px" }} type="submit">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
