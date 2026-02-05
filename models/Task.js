const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  type: { type: String, required: true }, // backup, script, etc
  payload: { type: Object },

  status: {
    type: String,
    enum: ["queued", "running", "success", "failed"],
    default: "queued"
  },

  attempts: { type: Number, default: 0 },
  maxAttempts: { type: Number, default: 3 },

  result: String,
  error: String,

  durationMs: Number,

  startedAt: Date,
  finishedAt: Date,

  history: [
    {
      attempt: Number,
      timestamp: Date,
      status: String,
      message: String
    }
  ],
  nextRunAt: {
  type: Date,
  default: Date.now
}

}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
