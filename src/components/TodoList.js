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
  const [selectedTodos, setSelectedTodos] = useState(new Set());

  useEffect(() => {
    setTodoList(model.readAllTodos());
  }, []);

  useEffect(() => {
    setfilteredTodoList(
      model.readFilteredTodos(filterInfo.importance, filterInfo.date)
    );
  }, [filterInfo, todoList]);

  const handleSelect = (todoId) => {
    setSelectedTodos((prevSelectedTodos) => {
      const updatedSelectedTodos = new Set(prevSelectedTodos);

      if (prevSelectedTodos.has(todoId)) {
        updatedSelectedTodos.delete(todoId);
      } else {
        updatedSelectedTodos.add(todoId);
      }

      return updatedSelectedTodos;
    });
  };

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

  const countCompletedTodos = () => {
    let completedCount = 0;

    filteredTodoList.forEach((todo) => {
      if (todo.completed) {
        completedCount += 1;
      }
    });

    return completedCount;
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
          <Analytics
            totalCount={filteredTodoList.length}
            completedCount={countCompletedTodos()}
          />
        </div>
        <div className="todolist-body-container">
          {filteredTodoList.map((todo) => (
            <Todo
              key={todo.id}
              todoInfo={todo}
              isSelected={selectedTodos.has(todo.id)}
              onToggle={() => {
                handleToggle(todo.id);
              }}
              onDelete={() => {
                handleDelete(todo.id);
              }}
              onEdit={() => {
                showEditForm(todo.id);
              }}
              onSelect={() => {
                handleSelect(todo.id);
              }}
            />
          ))}
        </div>

        {editFormInfo.showEditForm && renderEditForm()}
      </div>
    </div>
  );
};

export default TodoList;
