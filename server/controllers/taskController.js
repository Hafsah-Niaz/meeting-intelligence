const Meeting = require("../models/Meeting");
const { analyzeNotes } = require("../services/aiService");

exports.createMeeting = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes) {
      return res.status(400).json({ message: "Notes required" });
    }

    const result = await analyzeNotes(notes);

    const savedMeeting = await Meeting.create(result);

    res.status(201).json(savedMeeting);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Processing failed" });
  }
};

exports.getMeetings = async (req, res) => {
  const meetings = await Meeting.find().sort({ createdAt: -1 });
  res.json(meetings);
};