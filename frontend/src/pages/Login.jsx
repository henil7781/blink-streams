// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../css/Auth.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);

//       // Save token & user
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       setMessage("Login successful!");
//       setForm({ email: "", password: "" });

//       // Redirect to Home.jsx
//       navigate("/");
//     } catch (err) {
//       setMessage(err.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-overlay">
//         <form className="auth-form" onSubmit={handleSubmit}>
//           <h2>Login</h2>
//           {message && <p className="auth-message">{message}</p>}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">Login</button>
//           <p className="switch-auth">
//             Don't have an account? <a href="/signup">Sign Up</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }
// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import "../css/Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful!");
      setForm({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {message && <p className="auth-message">{message}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
          {/* // In Login page JSX, below Login button  */}
            {/* // Login.jsx */}
<p className="forgot-link">
   <Link to="/forgot-password">Forgot Password?</Link>
</p>


          <p className="switch-auth">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
