const mongoose = require("mongoose");
const { Schema } = mongoose;

const goalSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    subgoals: [{ subgoals_text: String, completed: Boolean }],
    completed: Boolean,
    startDate: Date,
    endDate: Date,
    tags: [String],
    onHold: { Boolean, default: false },
    notStarted: Boolean,
    author: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
