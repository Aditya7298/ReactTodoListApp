import "./Analytics.css";

const Analytics = ({ todoList }) => {
  let completedCount = 0;
  todoList.forEach((todo) => {
    if (todo.completed) {
      completedCount += 1;
    }
  });

  const totalCount = todoList.length;

  const radius = 98;
  const circumference = radius * 2 * Math.PI;
  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const offset = circumference - (percent / 100) * circumference;

  const progressRingStyle = {
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: offset,
  };

  return (
    <div className="analytics">
      <h3>Completed Todos</h3>
      <svg className="analytics-progress-ring">
        <circle
          className="analytics-progress-ring__circle"
          strokeWidth="4"
          fill="#769fcd"
          r="98"
          cx="50%"
          cy="25%"
          stroke="black"
          style={progressRingStyle}
        ></circle>
        <text
          className="analytics-progress-ring__text"
          x="50%"
          y="27%"
          fill="black"
          fontSize="x-large"
          textAnchor="middle"
        >
          {completedCount} out of {totalCount}
        </text>
      </svg>
    </div>
  );
};

export default Analytics;
