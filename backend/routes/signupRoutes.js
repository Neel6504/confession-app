const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const userId = `user_${randomNum}`;

    const newUser = new User({ name, email, password, userId });

    await newUser.save();
    
    res.status(201).json({ message: "Signup successful", userId: newUser.userId });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

module.exports = router;
