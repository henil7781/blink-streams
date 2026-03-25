// src/pages/Profile.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Profile.css";
import { useNavigate } from "react-router-dom";   // ✅ import here

function Profile({ setUser }) {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    name: "",
    username: "",
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
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }
    setForm({ 
      ...form, 
      name: user.name, 
      username: user.username,
      email: user.email, 
      phone: user.phone || "" 
    });
    setPreviewUrl(user.profileImage);
  }, [navigate]);

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
      setUser(res.data.user); // Update global state
      setMessage(res.data.message || res.data.msg || "Profile updated ✅");
 // ✅ Redirect after success (optional: delay 1s so user sees message)
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || err.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div className="profile-edit-simple">
      <h1>Edit Profile</h1>
      {message && <p className="msg">{message}</p>}

      <form onSubmit={handleSave}>
        <div className="preview-container">
          {previewUrl ? (
            <img 
              src={previewUrl.startsWith("blob:") ? previewUrl : `http://localhost:5000${previewUrl}`} 
              alt="Profile" 
              className="profile-preview" 
            />
          ) : (
            <div className="profile-preview profile-initials-large">
              {form.name ? form.name.charAt(0).toUpperCase() : "?"}
            </div>
          )}
          <label htmlFor="file-upload" className="file-input-label">
            Change Photo
          </label>
          <input 
            id="file-upload" 
            type="file" 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
        </div>

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          disabled
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />

        <h3>Security</h3>
        <label>Current Password</label>
        <input
          type="password"
          name="oldPassword"
          value={form.oldPassword}
          onChange={handleChange}
          placeholder="Leave blank to keep current"
        />
        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="Minimum 6 characters"
        />
        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <div className="btn-group">
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" onClick={handleLogout} className="logout-btn-profile">Logout</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
