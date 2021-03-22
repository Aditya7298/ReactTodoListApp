import "./Todo.css";

const Todo = ({
  todoInfo,
  isSelected,
  onToggle,
  onDelete,
  onEdit,
  onSelect,
}) => {
  const { title, importance, date } = todoInfo;
  return (
    <div className="todo">
      <span
        onClick={onSelect}
        className={
          isSelected
            ? "todo-selectbutton todo-selectbutton-selected"
            : "todo-selectbutton"
        }
      ></span>
      <span className="todo-title">{title}</span>
      <span className="todo-date">{date}</span>
      <div className="todo-buttons">
        <button onClick={onToggle}>Toggle</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};

export default Todo;
