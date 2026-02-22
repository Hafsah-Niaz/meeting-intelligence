import { Routes, Route, Link } from "react-router-dom";
import { FaTasks, FaHistory, FaRobot } from "react-icons/fa";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import "./App.css";

function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2><FaRobot /> Notes Summarizer</h2>
        <ul>
          <li><Link to="/"><FaTasks /> Dashboard</Link></li>
          <li><Link to="/history"><FaHistory /> History</Link></li>
        </ul>
      </aside>

      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;