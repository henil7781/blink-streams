import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/email.js";

// SIGNUP
export const signup = async (req, res) => {
  const { name, username, phone, email, password } = req.body;
  
  try {
    // 1. Check if user already exists
    let existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      const field = existingUser.email === email ? "Email" : "Username";
      return res.status(400).json({ success: false, message: `${field} already exists` });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // 3. Create user
    const user = await User.create({ 
      name, 
      username, 
      phone, 
      email, 
      password: hashed 
    });

    // 4. Generate Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 5. Send Email (Non-blocking)
    transporter.sendMail({
      from: `"Bl!nk" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Bl!nk - Let's Start Streaming!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #E50914;">Welcome to Bl!nk, ${name}!</h2>
          <p>We're thrilled to have you on board. Your account has been created successfully.</p>
          <div style="padding: 15px; background: #f9f9f9; border-radius: 5px;">
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          <p>You can now sign in and start enjoying our content.</p>
          <p>– Team Bl!nk</p>
        </div>
      `,
    }).catch(err => {
      console.error("❌ Sign-up Welcome Email Failed:", err.message);
      console.error("DEBUG: Check EMAIL_USER/PASS and Gmail App Password settings.");
    });

    return res.json({ 
      success: true,
      token, 
      user: { id: user._id, name: user.name, username: user.username, email: user.email },
      message: "Signup successful"
    });

  } catch (err) {
    console.error("Signup error:", err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: "Server error during signup" });
  }
};

// LOGIN
// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send login notification email (Non-blocking)
    transporter.sendMail({
      from: `"Bl!nk Security" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "New Login to your Bl!nk account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #333;">New Login Detected</h2>
          <p>Hello ${user.name},</p>
          <p>Your Bl!nk account was just accessed from a new device/browser.</p>
          <p style="color: #666; font-size: 13px;">Date: ${new Date().toLocaleString()}</p>
          <p>If this was not you, please secure your account by resetting your password immediately.</p>
          <p>– Bl!nk Security Team</p>
        </div>
      `
    }).catch(err => {
      console.error("❌ Login Notification Email Failed:", err.message);
    });

    return res.json({ 
      success: true,
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        username: user.username, 
        email: user.email,
        profileImage: user.profileImage,
        phone: user.phone
      },
      message: "Login successful"
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};


// FORGOT PASSWORD - SEND OTP
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ success: false, message: "User with this email does not exist" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save({ validateBeforeSave: false });

    await transporter.sendMail({
      from: `"Bl!nk Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; text-align: center;">
          <h2 style="color: #E50914;">Reset Your Password</h2>
          <p>Use the following One-Time Password (OTP) to reset your password. This code is valid for 10 minutes.</p>
          <div style="font-size: 36px; font-weight: 800; letter-spacing: 5px; color: #333; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #666;">If you didn't request this, you can safely ignore this email.</p>
          <p>– Bl!nk Support</p>
        </div>
      `,
    }).catch(err => {
      console.error("❌ OTP Email Failed:", err.message);
      console.error("DEBUG: Full Error:", err);
    });

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ success: false, message: "Server error during OTP request" });
  }
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
  const email = req.body.email?.toLowerCase().trim();
  const otp = req.body.otp?.trim();

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const now = Date.now();
    const isOtpMatch = user.resetOtp === otp;
    const isExpired = now > user.otpExpires;

    console.log(`[OTP DEBUG] Email: ${email}`);
    console.log(`[OTP DEBUG] Input OTP: "${otp}" | DB OTP: "${user.resetOtp}" | Match: ${isOtpMatch}`);
    console.log(`[OTP DEBUG] Now: ${new Date(now).toISOString()} | Expires: ${user.otpExpires?.toISOString()} | Expired: ${isExpired}`);

    if (!user.resetOtp || !isOtpMatch || isExpired) {
      const reason = !isOtpMatch ? "Invalid OTP" : "OTP expired";
      return res.status(400).json({ success: false, message: reason });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    res.json({ 
      success: true,
      message: "OTP verified successfully", 
      token, 
      user: { id: user._id, name: user.name, username: user.username, email: user.email } 
    });
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ success: false, message: "Server error during verification" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.username = req.body.username || user.username;

    let passwordChanged = false;
    if (req.body.newPassword) {
      const match = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!match) return res.status(400).json({ success: false, message: "Old password incorrect" });
      user.password = await bcrypt.hash(req.body.newPassword, 10);
      passwordChanged = true;
    }

    if (req.file) {
      user.profileImage = "/uploads/profile/" + req.file.filename;
    }

    await user.save({ validateBeforeSave: false });

    // Send email notification
    transporter.sendMail({
      from: `"Bl!nk Security" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your Bl!nk Profile Was Updated",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #333;">Profile Update Notification</h2>
          <p>Hello ${user.name},</p>
          <p>This is to let you know that your Bl!nk account details were recently updated.</p>
          ${passwordChanged ? '<p><strong>Your password was changed.</strong></p>' : ''}
          <p>If this was not you, please secure your account immediately.</p>
          <p>– Bl!nk Security Team</p>
        </div>
      `
    }).catch(err => {
      console.error("❌ Profile Update Email Failed:", err.message);
    });

    res.json({ success: true, user, message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};
export const resetPassword = async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, 10);
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    // Send confirmation email
    transporter.sendMail({
      from: `"Bl!nk Security" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Bl!nk: Password Reset Successful",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #008000;">Password Successfully Reset</h2>
          <p>Hello ${user.name},</p>
          <p>Your Bl!nk password has been successfully updated.</p>
          <p>If you did not perform this action, please contact our security team immediately.</p>
          <p>– Bl!nk Security</p>
        </div>
      `
    }).catch(err => {
      console.error("❌ Password Reset Confirm Email Failed:", err.message);
    });

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ success: false, message: "Server error during password reset" });
  }
};