// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const router = express.Router();

// const User = require("../models/User");
// const transporter = require("../config/email");

// // Helper to generate token
// function generateToken(payload) {
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
// }

// // Signup
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body || {};

//     if (!name || !email || !password) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     const normalizedEmail = email.toLowerCase().trim();
//     const existing = await User.findOne({ email: normalizedEmail });
//     if (existing) return res.status(400).json({ msg: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ name, email: normalizedEmail, password: hashed });
//     await user.save();

//     // Send welcome email (failures here shouldn't block signup)
//     transporter.sendMail({
//       from: `"MovieMag" <${process.env.EMAIL_USER}>`,
//       to: normalizedEmail,
//       subject: "Welcome to MovieMag 🎬",
//       html: `<h1>Hi ${name}!</h1><p>Thanks for signing up. Enjoy exploring our movie collection!</p>`
//     }).catch(err => console.warn("Welcome email failed:", err.message));

//     return res.status(201).json({ msg: "Signup successful", user: { name, email: normalizedEmail } });
//   } catch (err) {
//     console.error("Signup error:", err);
//     // handle duplicate key error (race)
//     if (err.code === 11000) return res.status(400).json({ msg: "User already exists" });
//     return res.status(500).json({ msg: "Signup failed" });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body || {};
//     if (!email || !password) return res.status(400).json({ msg: "Email and password required" });

//     const normalizedEmail = email.toLowerCase().trim();
//     const user = await User.findOne({ email: normalizedEmail });
//     if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     const token = generateToken({ id: user._id, email: user.email });

//     // Optionally send login alert (non-blocking)
//     transporter.sendMail({
//       from: `"MovieMag" <${process.env.EMAIL_USER}>`,
//       to: normalizedEmail,
//       subject: "New Login to your MovieMag account",
//       html: `<p>Hi ${user.name},</p><p>You just logged in. If this wasn't you, change your password.</p>`
//     }).catch(err => console.warn("Login email failed:", err.message));

//     return res.json({
//       msg: "Login successful",
//       user: { name: user.name, email: user.email },
//       token
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ msg: "Login failed" });
//   }
// });

// module.exports = router;
import express from "express";
import { signup, login, forgotPassword, verifyOtp, updateProfile } from "../controllers/authController.js";
// import authMiddleware from "../middleware/auth.js"
// import { updateProfile } from "../controllers/authController.js";
import  upload  from "../middleware/upload.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);    // ✅ ADD THIS
router.post("/verify-otp", verifyOtp);
// router.put("/update-profile", auth, updateProfile);
router.put("/update-profile", auth, upload.single("profileImage"), updateProfile);
export default router;
