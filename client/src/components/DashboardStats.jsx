export default function DashboardStats({ tasks }) {
  const total = tasks?.length || 0;
  const high = tasks?.filter(t => t.priority === "High").length || 0;

  return (
  <div className="stats-wrapper">
    <div className="stats-container">
      <div className="glass stat-card">
        <h3>Total Tasks</h3>
        <h2>{total}</h2>
      </div>

      <div className="glass stat-card">
        <h3>High Priority</h3>
        <h2 style={{ color: "#ef4444" }}>{high}</h2>
      </div>
    </div>
  </div>
);
}