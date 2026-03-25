import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"],
    trim: true 
  },
  username: { 
    type: String, 
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, "Username must be at least 3 characters"]
  },
  email: { 
    type: String, 
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { 
    type: String, 
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  phone: { 
    type: String,
    trim: true
  },
  profileImage: { 
    type: String,
    default: ""
  },
  resetOtp: {
    type: String
  },
  otpExpires: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
