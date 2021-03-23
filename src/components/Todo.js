import "./Todo.css";

const Todo = ({
  todoInfo,
  isSelected,
  onToggle,
  onDelete,
  onEdit,
  onSelect,
}) => {
  const { id, title, importance, date } = todoInfo;

  return (
    <div className="todo">
      <span
        onClick={() => {
          onSelect(id);
        }}
        className={
          isSelected
            ? "todo-selectbutton todo-selectbutton-selected"
            : "todo-selectbutton"
        }
      ></span>
      <span className="todo-title">{title}</span>
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
