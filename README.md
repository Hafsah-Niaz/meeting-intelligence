# 🤖 AI Meeting Intelligence-Notes Summarizer

A full-stack AI-powered web application that transforms unstructured meeting notes into structured, actionable tasks with assignees, deadlines, and priority levels.

🔗 **Live Demo:** https://meeting-intelligence-dn20ay3om-hafsahniaz25-9204s-projects.vercel.app

---

## ✨ Features

- 🧠 AI-based task extraction (Gemini API integration)
- 📌 Automatic detection of:
  - Assignee
  - Deadline (dates + relative terms)
  - Priority (High / Medium / Low)
- 📊 Dashboard with:
  - Total tasks counter
  - High priority tracker
- 🕘 Meeting history storage (MongoDB Atlas)
- 🎨 Modern UI with glassmorphism design
- ⚡ Fully deployed (Vercel + Render + MongoDB Atlas)

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Axios
- Modern CSS (Glassmorphism UI)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Gemini API (with fallback logic)

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 🚀 How It Works

1. User pastes meeting notes.
2. Backend sends notes to Gemini API.
3. AI extracts structured tasks.
4. Tasks are stored in MongoDB.
5. Dashboard and History update in real-time.

If the AI quota fails, a fallback logic ensures the app continues working without breaking.

---

## 📈 Future Improvements

- Authentication system
- Role-based access control
- Editable task management
- Export to PDF/CSV
- Calendar integration

---

## 👩‍💻 Author

Built and deployed as a full-stack project to demonstrate:
- API integration
- AI-based automation
- RESTful architecture
- Cloud deployment

---

## ⭐ Why This Project Matters

This project showcases real-world full-stack engineering skills:
- Environment variable management
- Production deployment
- Database integration
- Error handling & fallback logic
- SPA routing configuration


