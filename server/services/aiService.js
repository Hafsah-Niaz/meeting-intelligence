const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

/*
  🔐 Toggle this:
  true  → Use Gemini AI
  false → Use only fallback (no AI call at all)
*/
const USE_AI = true;

let genAI = null;

if (USE_AI && process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

exports.analyzeNotes = async (notes) => {
  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];

  // ============================
  // 1️⃣ TRY GEMINI (IF ENABLED)
  // ============================
  if (USE_AI && genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash"
      });

      const prompt = `
You are an AI assistant that extracts structured meeting insights.

Today's date is ${todayISO}.

Return STRICT JSON in this format:

{
  "summary": "Professional summary here",
  "tasks": [
    {
      "task": "Task description",
      "assignee": "Person name or Unknown",
      "deadline": "YYYY-MM-DD or None",
      "priority": "High | Medium | Low"
    }
  ]
}

Convert relative dates like "Tuesday", "tomorrow", "in 3 days"
into actual YYYY-MM-DD format.

Meeting Notes:
${notes}
`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      const cleaned = response.replace(/```json|```/g, "").trim();

      const parsed = JSON.parse(cleaned);

      console.log("✅ Gemini used successfully");
      return parsed;

    } catch (error) {
      console.log("⚠ Gemini failed. Switching to fallback.");
      console.error(error.message);
    }
  }

  // ============================
// 2️⃣ SMART FALLBACK MODE
// ============================

console.log("🛠 Running improved fallback extraction");

const lines = notes.split(".");
const tasks = [];


const weekdays = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
};

// Words that are NOT names
const invalidNames = ["During", "There", "The", "Low"];

lines.forEach((line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  const lower = trimmed.toLowerCase();

  // ==================
  // PRIORITY
  // ==================
  let priority = "Medium";

  if (lower.includes("urgent") || lower.includes("immediately")) {
    priority = "High";
  }

  if (lower.includes("low priority")) {
    priority = "Low";
  }

  // ==================
  // ASSIGNEE
  // ==================
  let assignee = "Unknown";

  // Detect Team
  const teamMatch = trimmed.match(/(QA team|DevOps team|Security team|Marketing team)/i);
  if (teamMatch) {
    assignee = teamMatch[0];
  } else {
    // Detect proper name (capitalized word not in invalid list)
    const nameMatch = trimmed.match(/\b([A-Z][a-z]+)\b/);
    if (
      nameMatch &&
      !invalidNames.includes(nameMatch[0]) &&
      trimmed.startsWith(nameMatch[0])
    ) {
      assignee = nameMatch[0];
    }
  }

  // ==================
  // DEADLINE
  // ==================
  let deadline = "None";

  const todayDay = today.getDay();

  // Weekday
  for (const day in weekdays) {
    if (lower.includes(day)) {
      const targetDay = weekdays[day];
      let diff = targetDay - todayDay;
      if (diff < 0) diff += 7;

      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + diff);
      deadline = targetDate.toISOString().split("T")[0];
    }
  }

  // Tomorrow
  if (lower.includes("tomorrow")) {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    deadline = tomorrow.toISOString().split("T")[0];
  }

  // In X days
  const matchDays = lower.match(/in (\d+) days/);
  if (matchDays) {
    const daysToAdd = parseInt(matchDays[1]);
    const future = new Date(today);
    future.setDate(today.getDate() + daysToAdd);
    deadline = future.toISOString().split("T")[0];
  }

  // Next week
  if (lower.includes("next week")) {
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    deadline = nextWeek.toISOString().split("T")[0];
  }

  // March 18
  const monthMatch = trimmed.match(/March\s(\d+)/i);
  if (monthMatch) {
    const dayNumber = monthMatch[1];
    const year = today.getFullYear();
    deadline = `${year}-03-${dayNumber.padStart(2, "0")}`;
  }

  tasks.push({
    task: trimmed,
    assignee,
    deadline,
    priority
  });
});

return {
  summary: "Structured action items extracted from meeting notes.",
  tasks
};
};