import { useState } from "react";
import NotesInput from "../components/NotesInput";
import TaskTable from "../components/TaskTable";
import DashboardStats from "../components/DashboardStats";

export default function Dashboard() {
  const [data, setData] = useState({ summary: "", tasks: [] });
  const [loading, setLoading] = useState(false);

  return (
    <div className="dashboard-container">
      <div className="glass large-card">
        <NotesInput setData={setData} setLoading={setLoading} />
      </div>

      {loading && <div className="spinner"></div>}

      {data.summary && (
        <div className="glass large-card">
          <h3>Meeting Summary</h3>
          <p>{data.summary}</p>
        </div>
      )}

      <DashboardStats tasks={data.tasks} />

      <div className="glass large-card">
        <TaskTable tasks={data.tasks} />
      </div>
    </div>
  );
}