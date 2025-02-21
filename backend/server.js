const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/confession-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Import routes
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");

// Use Routes
app.use("/api/auth/signup", signupRoutes);
app.use("/api/auth/login", loginRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
