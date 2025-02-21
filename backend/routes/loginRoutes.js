const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare passwords directly (since we're not hashing)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.json({ message: "Login Successful", userId: user.userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
