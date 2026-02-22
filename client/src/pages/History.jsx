import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [meetings, setMeetings] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/meetings`);
      setMeetings(res.data);
    };
    fetchMeetings();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getBadgeClass = (priority) => {
    if (priority === "High") return "badge high";
    if (priority === "Medium") return "badge medium";
    return "badge low";
  };

  return (
    <>
      <h2 style={{ marginBottom: "20px" }}>Meeting History</h2>

      {meetings.map((meeting) => (
        <div key={meeting._id} className="glass">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => toggleExpand(meeting._id)}
          >
            <p><strong>Summary:</strong> {meeting.summary}</p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(meeting.createdAt).toLocaleString()}
            </p>
            <p><strong>Tasks:</strong> {meeting.tasks.length}</p>
          </div>

          {expandedId === meeting._id && (
            <div style={{ marginTop: "15px" }}>
              {meeting.tasks.map((task, index) => (
                <div
                  key={index}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <p><strong>Task:</strong> {task.task}</p>
                  <p><strong>Assignee:</strong> {task.assignee}</p>
                  <p><strong>Deadline:</strong> {task.deadline}</p>
                  <span className={getBadgeClass(task.priority)}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}