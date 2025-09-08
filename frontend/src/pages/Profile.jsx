// src/pages/Profile.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Profile.css";
import { useNavigate } from "react-router-dom";   // ✅ import here

function Profile() {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setForm({ ...form, name: user.name, email: user.email, phone: user.phone });
    setPreviewUrl(user.profileImage);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  navigate("/");
};


  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      return setMessage("Passwords don't match");
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("oldPassword", form.oldPassword);
      formData.append("newPassword", form.newPassword);
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const res = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Profile updated ✅");
 // ✅ Redirect after success (optional: delay 1s so user sees message)
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setMessage("Update failed");
    }
  };

  return (
    <div className="profile-edit-simple">
      <h1>Edit Profile</h1>
      {message && <p className="msg">{message}</p>}

      <form onSubmit={handleSave}>
        {previewUrl && (
          <img src={previewUrl} alt="Profile" className="profile-preview" />
        )}

        <input type="file" onChange={handleFileChange} accept="image/*" />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <h3>Change Password (optional)</h3>
        <label>Old Password</label>
        <input
          type="password"
          name="oldPassword"
          value={form.oldPassword}
          onChange={handleChange}
        />
        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <br></br>

      <div className="btn-group">
  <button type="submit" className="save-btn">Save</button>
  <button onClick={handleLogout} className="logout-btn">Logout</button>
</div>

      </form>
    </div>
  );
}

export default Profile;
