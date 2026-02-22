const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: String,
  assignee: String,
  deadline: String,
  priority: String,
});

const MeetingSchema = new mongoose.Schema({
  summary: String,
  tasks: [TaskSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Meeting", MeetingSchema);