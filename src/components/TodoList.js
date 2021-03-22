import { useState, useEffect } from "react";
import model from "../model";
import Todo from "./Todo";
import EditForm from "./EditForm";
import Navbar from "./Navbar";
import AddForm from "./AddForm";
import FilterForm from "./FilterForm";
import Analytics from "./Analytics";
import "./TodoList.css";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [editFormInfo, setEditFormInfo] = useState({
    showEditForm: false,
    boundTodoId: null,
  });
  const [filteredTodoList, setfilteredTodoList] = useState([]);
  const [filterInfo, setFilterInfo] = useState({
    importance: "",
    date: "",
  });

  useEffect(() => {
    setTodoList(model.readAllTodos());
  }, []);

  useEffect(() => {
    setfilteredTodoList(
      model.readFilteredTodos(filterInfo.importance, filterInfo.date)
    );
  }, [filterInfo, todoList]);

  const handleAdd = (newTodoInfo) => {
    const { title, importance } = newTodoInfo;
    model.createTodo(title, importance).then((modelResponse) => {
      if (modelResponse) {
        setTodoList(model.readAllTodos());
      } else {
        //Handle Error
      }
    });
  };

  const handleDelete = (todoId) => {
    model.deleteTodo(todoId).then((modelResponse) => {
      if (modelResponse) {
        setTodoList(model.readAllTodos());
      } else {
        //Handle Error
      }
    });
  };

  const handleToggle = (todoId) => {
    model.toggleTodo(todoId).then((modelResponse) => {
      if (modelResponse) {
        setTodoList(model.readAllTodos());
      } else {
        //Handle Error
      }
    });
  };

  const handleEdit = (todoId, updatedTitle, updatedImportance) => {
    const prevTodo = model.readSingleTodo(todoId);
    const updatedTodo = {
      ...prevTodo,
      title: updatedTitle,
      importance: updatedImportance,
    };
    model.editTodo(updatedTodo.id, updatedTodo).then((modelResponse) => {
      if (modelResponse) {
        setTodoList(model.readAllTodos());
      } else {
        //Handle Error
      }
    });
  };

  const handlefilter = (filteredImportance, filteredDate) => {
    setFilterInfo({ importance: filteredImportance, date: filteredDate });
  };

  /*Functions to handle the edit form. 
  The edit form is bound to the todo on which edit button is clicked*/

  const showEditForm = (todoId) => {
    setEditFormInfo({ showEditForm: true, boundTodoId: todoId });
  };

  const hideEditForm = () => {
    setEditFormInfo({ showEditForm: false, boundTodoId: null });
  };

  const renderEditForm = () => {
    const boundTodo = model.readSingleTodo(editFormInfo.boundTodoId);
    return (
      <EditForm
        todoId={boundTodo.id}
        todoTitle={boundTodo.title}
        todoImportance={boundTodo.importance}
        hideEditForm={hideEditForm}
        onSubmit={handleEdit}
      />
    );
  };

  return (
    <div className="todolist">
      <div className="todolist-header">
        <Navbar />
      </div>
      <div className="todolist-body">
        <div className="todolist-body-sidebar">
          <AddForm onAdd={handleAdd} />
          <FilterForm onFilter={handlefilter} />
          <Analytics totalCount={3} completedCount={1} />
        </div>
        <div className="todolist-body-container">
          {filteredTodoList.map((todo) => (
            <Todo
              key={todo.id}
              todoInfo={todo}
              onToggle={() => handleToggle(todo.id)}
              onDelete={() => handleDelete(todo.id)}
              onEdit={() => showEditForm(todo.id)}
            />
          ))}
        </div>

        {editFormInfo.showEditForm && renderEditForm()}
      </div>
    </div>
  );
};

export default TodoList;
