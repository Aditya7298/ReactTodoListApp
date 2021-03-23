import "./Todo.css";
import todoToggle from "./Icons/task-complete.png";
import todoDelete from "./Icons/single-delete.png";
import todoEdit from "./Icons/edit.png";

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
      <span className="todo-importance">{importance}</span>
      <div className="todo-buttons">
        <span
          onClick={() => {
            onToggle(id);
          }}
        >
          <img
            alt="Toggle Todo Complete"
            className="todo-buttons-toggle"
            src={todoToggle}
          ></img>
        </span>
        <span
          onClick={() => {
            onDelete(id);
          }}
        >
          <img
            alt="Toggle Todo Complete"
            className="todo-buttons-delete"
            src={todoDelete}
          ></img>
        </span>
        <span
          onClick={() => {
            onEdit(id);
          }}
        >
          <img
            alt="Toggle Todo Complete"
            className="todo-buttons-edit"
            src={todoEdit}
          ></img>
        </span>
      </div>
    </div>
  );
};

export default Todo;
