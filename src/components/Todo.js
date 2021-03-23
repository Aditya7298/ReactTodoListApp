import "./Todo.css";

const Todo = ({
  todoInfo,
  isSelected,
  onToggle,
  onDelete,
  onEdit,
  onSelect,
}) => {
  const { id, title, importance, date, completed } = todoInfo;

  return (
    <div className="todo">
      <span
        onClick={() => {
          onSelect(id);
        }}
        className={`todo-selectbutton ${
          isSelected ? "todo-selectbutton-selected" : ""
        }`}
      ></span>
      <span className={`todo-title ${completed ? "todo-completed" : ""}`}>
        {title}
      </span>
      <span className="todo-date">{date}</span>
      <div className="todo-buttons">
        <button
          onClick={() => {
            onToggle(id);
          }}
        >
          Toggle
        </button>
        <button
          onClick={() => {
            onDelete(id);
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            onEdit(id);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Todo;
