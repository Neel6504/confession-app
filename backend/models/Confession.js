const mongoose = require("mongoose");

const ConfessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    confessionText: { type: String, required: true },
    likes: { type: Number, default: 0 },
    superLikes: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] }, // Track users who liked
    superLikedBy: { type: [String], default: [] } // Track users who super-liked
  },
  { timestamps: true } // ✅ Adds `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model("Confession", ConfessionSchema);
