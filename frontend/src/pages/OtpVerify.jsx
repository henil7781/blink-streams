import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/Auth.css";

export default function OtpVerify() {
  const [otpDigits, setOtpDigits] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const email = localStorage.getItem("reset_email") || "your email";

  // Masking email (e.g., he***781@gmail.com)
  const maskEmail = (str) => {
    const [user, domain] = str.split("@");
    if (!domain) return str;
    return `${user.substring(0, 2)}***${user.substring(user.length - 2)}@${domain}`;
  };

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, ""); // Only numbers
    if (!val) return;

    const newOtp = [...otpDigits];
    newOtp[idx] = val.substring(val.length - 1); // Only take last char
    setOtpDigits(newOtp);

    // Focus next
    if (idx < 5) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (!otpDigits[idx] && idx > 0) {
        inputRefs.current[idx - 1].focus();
      }
      const newOtp = [...otpDigits];
      newOtp[idx] = "";
      setOtpDigits(newOtp);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage("New OTP sent successfully! ✅");
      setTimer(60);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const otpCode = otpDigits.join("");
    if (otpCode.length < 6) return setMessage("Please enter all 6 digits");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp: otpCode,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.removeItem("reset_email");
      setMessage("Verification successful! Redirecting...");
      setTimeout(() => navigate("/reset-password"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP, please try again");
    }
  };

  // Auto-submit when last digit is filled
  useEffect(() => {
    if (otpDigits.join("").length === 6) {
      handleSubmit();
    }
  }, [otpDigits]);

  return (
    <div className="auth-container">
      <div className="auth-overlay">
        <div className="auth-form">
          <h2 style={{ textAlign: "center", marginBottom: "5px" }}>Verify Your Email</h2>
          <p className="otp-subtitle">
            We've sent a 6-digit code to <br />
            <strong>{maskEmail(email)}</strong>
          </p>

          {message && <p className={`auth-message ${message.includes("✅") || message.includes("successful") ? "success" : ""}`} 
                        style={{ color: message.includes("✅") || message.includes("successful") ? "#4CAF50" : "#e50914" }}>
            {message}
          </p>}

          <div className="otp-container">
            <div className="otp-inputs">
              {otpDigits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`otp-box ${digit ? "filled" : ""}`}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <button onClick={handleSubmit} disabled={otpDigits.join("").length < 6}>
              Verify OTP
            </button>
          </div>

          <div className="resend-container">
            {timer > 0 ? (
              <span>Resend code in <span className="resend-timer">0:{timer < 10 ? `0${timer}` : timer}</span></span>
            ) : (
              <button className="resend-link" onClick={handleResend} disabled={isResending}>
                {isResending ? "Sending..." : "Didn't get the code? Resend"}
              </button>
            )}
          </div>

          <div className="switch-auth">
            <Link to="/forgot-password" style={{ color: "#888", fontSize: "12px" }}>
              ← Use a different email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
