exports.generatePrompt = (notes) => `
Extract action items from the meeting notes below.

Return STRICT JSON in this format:

{
  "summary": "short meeting summary",
  "tasks": [
    {
      "task": "task description",
      "assignee": "person name or Unknown",
      "deadline": "YYYY-MM-DD or None",
      "priority": "High | Medium | Low"
    }
  ]
}

Meeting Notes:
${notes}
`;