const mongoose = require("mongoose");

const ConfessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    confessionText: { type: String, required: true },
    likes: { type: Number, default: 0 },
    superLikes: { type: Number, default: 0 }
  },
  { timestamps: true } // ✅ Adds `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model("Confession", ConfessionSchema);
