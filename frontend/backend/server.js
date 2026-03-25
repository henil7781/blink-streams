import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import path from "path";

import helmet from "helmet";
import morgan from "morgan";

dotenv.config();
connectDB();

const app = express();

// LOGGING
app.use(morgan("dev"));

// SECURITY HEADERS
app.use(helmet({
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// PERMISSIVE CORS FOR STABILITY
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(express.json());

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));  // ✅ serve static images

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("✅ MovieMag API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
