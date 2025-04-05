require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// ✅ Import route modules (these must export Express Router)
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// 🔗 Connect to MongoDB
connectDB();

// ✅ Middleware to parse JSON bodies
app.use(express.json());

// ✅ Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Serve uploaded static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Mount API routes
app.use("/api/auth", authRoutes);     // Auth routes
app.use("/api/users", userRoutes);    // User routes
app.use("/api/tasks", taskRoutes);    // Task routes
app.use("/api/reports", reportRoutes); // Report routes

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Task API is working fine");
});

// ✅ Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
