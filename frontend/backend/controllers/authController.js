import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/email.js";

// SIGNUP
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Welcome to Bl!nk: Go Behind The Stream",
  html: `
    <div style="font-family: 'Netflix Sans', Arial, sans-serif; padding: 20px;">
      <h1 style="font-size: 28px; color:#E50914;">Welcome to <strong>Bl!nk</strong>, ${name}!</h1>
      <p style="font-size: 16px; color: #333;">
        Thanks for joining <strong>Bl!nk</strong>, your new home for all things trending, behind-the-scenes, 
        and what-to-watch next.
      </p>
      <hr/>
      <p style="font-size: 14px; color:#555;">
        🎬 You’ll now get exclusive updates, top 10 charts, trailers, and more right here!
      </p>
      <p style="margin-top: 30px; font-size: 14px;">Enjoy the experience!<br/>Team Bl!nk</p>
    </div>
  `
});


    return res.json({ token, user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Signup failed" });
  }
};

// LOGIN
// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send login notification email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
      to: user.email,
        subject: "Bl!nk: Successful Login Notification",
        html: `
          <h2>Hello ${user.name},</h2>
          <p>You have successfully logged in to your Bl!nk account.</p>
          <p>If this wasn't you, please reset your password immediately.</p>
        `
      });
      console.log("Login email sent");
    } catch (error) {
      console.error("Error sending login email:", error);
    }

    return res.json({ token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Login failed" });
  }
};


// FORGOT PASSWORD - SEND OTP
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("Forgot: ", email);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp);

    await User.updateOne(
      { _id: user._id },
      { resetOtp: otp, otpExpires: Date.now() + 10 * 60 * 1000 }
    );

    await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Your Bl!nk Login OTP",
  html: `
    <div style="font-family: 'Arial', sans-serif; padding: 20px;">
      <h2 style="font-size: 24px; color:#E50914;">Bl!nk Login Verification</h2>
      <p style="font-size: 16px;">Hi there,</p>
      <p style="font-size: 16px;">Your one-time password (OTP) for login is:</p>
      <div style="font-size: 32px; font-weight:bold; letter-spacing: 2px; background:#f2f2f2; padding: 10px 20px; display: inline-block; margin:15px 0;">
        ${otp}
      </div>
      <p style="font-size: 14px; color:#555;">This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
      <p style="font-size: 14px;">If you didn’t request this, please ignore this email.</p>
      <br/>
      <p style="font-size: 14px;">– Team Bl!nk</p>
    </div>
  `
});


    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ msg: "Error sending OTP" });
  }
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log("Verify body:", req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    console.log("Stored OTP:", user.resetOtp, "Client OTP:", otp);

    if (user.resetOtp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await User.updateOne({ _id: user._id }, { resetOtp: undefined, otpExpires: undefined });

    res.json({ msg: "OTP verified", token, user });
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ msg: "Error verifying OTP" });
  }
};
export const updateProfile = async (req, res) => {
  console.log("---- UPDATE PROFILE HIT ----");

  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Track what changed (optional)
    const oldValues = { name: user.name, email: user.email, phone: user.phone };

    // Update basic fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    let passwordChanged = false;
    if (req.body.newPassword) {
      const match = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!match) {
        return res.status(400).json({ msg: "Old password incorrect" });
      }
      user.password = await bcrypt.hash(req.body.newPassword, 10);
      passwordChanged = true;
    }

    if (req.file) {
      user.profileImage = "/uploads/profile/" + req.file.filename;
    }

    await user.save({ validateBeforeSave: false });

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Bl!nk Profile Was Updated",
      html: `
        <h3>Hello ${user.name}</h3>
        <p>This is to let you know that your Bl!nk account details were updated.</p>
        ${passwordChanged ? '<p><strong>Your password was changed.</strong></p>' : ''}
        <p>If this wasn't you, please secure your account immediately.</p>
        <p>– Team Bl!nk</p>
      `,
    });

    res.json({ user });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ msg: "Update failed", error: err.message });
  }
};