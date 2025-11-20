import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  score: {
    required: true,
    type: Number,
  },
});

export const Score = mongoose.model("Score", scoreSchema);
