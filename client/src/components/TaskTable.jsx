export default function TaskTable({ tasks }) {

  const getBadgeClass = (priority) => {
    if (priority === "High") return "badge high";
    if (priority === "Medium") return "badge medium";
    return "badge low";
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Assignee</th>
          <th>Deadline</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((task, index) => (
          <tr key={index}>
            <td>{task.task}</td>
            <td>{task.assignee}</td>
            <td>{task.deadline}</td>
            <td>
              <span className={getBadgeClass(task.priority)}>
                {task.priority}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}