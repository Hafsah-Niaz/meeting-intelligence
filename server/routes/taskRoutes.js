const express = require("express");
const router = express.Router();

const { createMeeting, getMeetings } = require("../controllers/taskController");

router.post("/meetings", createMeeting);
router.get("/meetings", getMeetings);

module.exports = router;