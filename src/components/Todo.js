import "./Todo.css";

const Todo = ({ todoInfo, onToggle, onDelete, onEdit }) => {
  const { title, importance, date } = todoInfo;
  return (
    <div className="todo">
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
