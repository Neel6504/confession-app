const express = require("express");
const router = express.Router();
const Confession = require("../models/Confession");

// ✅ Get all confessions
router.get("/all", async (req, res) => {
  try {
    const confessions = await Confession.find().populate("userId", "userId gender");
    console.log("Confessions with populated user:", JSON.stringify(confessions, null, 2));
    res.json(confessions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching confessions" });
  }
});

// ✅ Add a confession
router.post("/add", async (req, res) => {
  const { userId, confessionText } = req.body;

  if (!userId || !confessionText) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newConfession = new Confession({ 
      userId, 
      confessionText, 
      likes: 0, 
      superLikes: 0 
    });
    
    await newConfession.save();
    res.status(201).json({ message: "Confession added successfully", confession: newConfession });
  } catch (error) {
    res.status(500).json({ message: "Error adding confession", error: error.message });
  }
});

// ✅ Like a confession
router.put("/like/:id", async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) return res.status(404).json({ message: "Confession not found" });

    confession.likes = (confession.likes || 0) + 1;
    await confession.save();
    res.status(200).json({ message: "Confession liked", likes: confession.likes });
  } catch (error) {
    res.status(500).json({ message: "Error liking confession", error: error.message });
  }
});

// ✅ Super-like a confession
router.put("/superlike/:id", async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) return res.status(404).json({ message: "Confession not found" });

    confession.superLikes = (confession.superLikes || 0) + 1;
    await confession.save();
    res.status(200).json({ message: "Confession super-liked", superLikes: confession.superLikes });
  } catch (error) {
    res.status(500).json({ message: "Error super-liking confession", error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const confessions = await Confession.find({ userId: req.params.userId });
    res.json(confessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching confessions" });
  }
});

// ✅ Delete a confession by its ID
router.delete("/:id", async (req, res) => {
  try {
    await Confession.findByIdAndDelete(req.params.id);
    res.json({ message: "Confession deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting confession" });
  }
});



module.exports = router;
