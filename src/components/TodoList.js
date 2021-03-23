import { useState, useEffect, useCallback } from "react";
import { filtervalues } from "../constants";
import Todo from "./Todo";
import EditForm from "./EditForm";
import Navbar from "./Navbar";
import AddForm from "./AddForm";
import FilterForm from "./FilterForm";
import Analytics from "./Analytics";
import BulkButtons from "./BulkButtons";
import Snackbar from "./Snackbar";
import useHistory from "../hooks/useHistory";
import useModel from "../hooks/useModel";
import "./TodoList.css";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);

  const [editFormInfo, setEditFormInfo] = useState({
    showEditForm: false,
    boundTodoId: null,
  });

  const [filterInfo, setFilterInfo] = useState({
    importance: filtervalues.ALL,
    date: "",
  });

  const [selectedTodoIds, setSelectedTodoIds] = useState(new Set());

  const [showSnackbar, setShowSnackbar] = useState(false);

  const [
    readAllTodos,
    readSingleTodo,
    changeTodoStoreState,
    createTodo,
    editTodo,
    toggleTodo,
    toggleBulkTodos,
    deleteTodo,
    deleteBulkTodos,
  ] = useModel();

  const [
    initHistory,
    addNewEventToHistory,
    fetchUndoHistory,
    fetchRedoHistory,
    removeFromUndoHistory,
    removeFromRedoHistory,
  ] = useHistory();

  useEffect(() => {
    const currTodoList = readAllTodos();
    setTodoList(currTodoList);
    initHistory(currTodoList);
  }, [initHistory, readAllTodos]);

  useEffect(() => {
    const handleUndoRedoKeyPress = (evt) => {
      if (evt.metaKey && evt.key === "z") {
        const prevTodoListState = fetchUndoHistory();
        if (prevTodoListState) {
          changeTodoStoreState(prevTodoListState).then((modelResponse) => {
            if (modelResponse) {
              setTodoList(prevTodoListState);
              removeFromUndoHistory();
            } else {
              handleSnackbar();
            }
          });
        }
      }

      if (evt.metaKey && evt.key === "x") {
        const prevTodoListState = fetchRedoHistory();
        if (prevTodoListState) {
          changeTodoStoreState(prevTodoListState).then((modelResponse) => {
            if (modelResponse) {
              setTodoList(prevTodoListState);
              removeFromRedoHistory();
            } else {
              handleSnackbar();
            }
          });
        }
      }
    };

    window.addEventListener("keydown", handleUndoRedoKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUndoRedoKeyPress);
    };
  }, [
    fetchUndoHistory,
    fetchRedoHistory,
    removeFromUndoHistory,
    removeFromRedoHistory,
    changeTodoStoreState,
  ]);

  const handleSnackbar = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 2000);
  };

  const handleSelect = useCallback((todoId) => {
    setSelectedTodoIds((prevSelectedTodoIds) => {
      const updatedSelectedTodoIds = new Set(prevSelectedTodoIds);

      if (prevSelectedTodoIds.has(todoId)) {
        updatedSelectedTodoIds.delete(todoId);
      } else {
        updatedSelectedTodoIds.add(todoId);
      }

      return updatedSelectedTodoIds;
    });
  }, []);

  const handleAdd = useCallback(
    (newTodoInfo) => {
      const { title, importance } = newTodoInfo;
      createTodo(title, importance).then((modelResponse) => {
        if (modelResponse) {
          const currTodoList = readAllTodos();
          setTodoList(currTodoList);
          addNewEventToHistory(currTodoList);
        } else {
          handleSnackbar();
        }
      });
    },
    [addNewEventToHistory, readAllTodos, createTodo]
  );

  const handleDelete = useCallback(
    (todoId) => {
      deleteTodo(todoId).then((modelResponse) => {
        if (modelResponse) {
          const currTodoList = readAllTodos();
          setTodoList(currTodoList);
          addNewEventToHistory(readAllTodos());
        } else {
          handleSnackbar();
        }
      });
    },
    [addNewEventToHistory, readAllTodos, deleteTodo]
  );

  const handleBulkDelete = useCallback(() => {
    const todoIds = Array.from(selectedTodoIds);
    deleteBulkTodos(todoIds).then((modelResponse) => {
      if (modelResponse) {
        const currTodoList = readAllTodos();
        addNewEventToHistory(currTodoList);
        setTodoList(currTodoList);
        setSelectedTodoIds(new Set());
      } else {
        handleSnackbar();
      }
    });
  }, [selectedTodoIds, addNewEventToHistory, readAllTodos, deleteBulkTodos]);

  const handleToggle = useCallback(
    (todoId) => {
      toggleTodo(todoId).then((modelResponse) => {
        if (modelResponse) {
          const currTodoList = readAllTodos();
          setTodoList(currTodoList);
          addNewEventToHistory(currTodoList);
        } else {
          handleSnackbar();
        }
      });
    },
    [addNewEventToHistory, readAllTodos, toggleTodo]
  );

  const handleBulkToggle = useCallback(() => {
    const todoIds = Array.from(selectedTodoIds);
    toggleBulkTodos(todoIds).then((modelResponse) => {
      if (modelResponse) {
        const currTodoList = readAllTodos();
        setTodoList(currTodoList);
        addNewEventToHistory(currTodoList);
        setSelectedTodoIds(new Set());
      } else {
        handleSnackbar();
      }
    });
  }, [selectedTodoIds, addNewEventToHistory, toggleBulkTodos, readAllTodos]);

  const showEditForm = useCallback((todoId) => {
    setEditFormInfo({ showEditForm: true, boundTodoId: todoId });
  }, []);

  const handleEdit = useCallback(
    (todoId, updatedTitle, updatedImportance) => {
      const updatedTodo = {
        title: updatedTitle,
        importance: updatedImportance,
      };
      editTodo(todoId, updatedTodo).then((modelResponse) => {
        if (modelResponse) {
          const currTodoList = readAllTodos();
          setTodoList(currTodoList);
          addNewEventToHistory(currTodoList);
        } else {
          handleSnackbar();
        }
      });
    },
    [addNewEventToHistory, editTodo, readAllTodos]
  );

  const handlefilter = useCallback((filteredImportance, filteredDate) => {
    setFilterInfo({ importance: filteredImportance, date: filteredDate });
  }, []);

  const hideEditForm = useCallback(() => {
    setEditFormInfo({ showEditForm: false, boundTodoId: null });
  }, []);

  const renderEditForm = () => {
    const boundTodo = readSingleTodo(editFormInfo.boundTodoId);
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

  const getFilteredTodos = () => {
    const filteredTodos = todoList.filter((todo) => {
      const filteredDate =
          filterInfo.date === ""
            ? ""
            : new Date(filterInfo.date).toDateString(),
        filteredImportance = filterInfo.importance;

      if (filteredDate !== "" && todo.date !== filteredDate) {
        return false;
      }

      if (
        filteredImportance !== filtervalues.ALL &&
        todo.importance !== filteredImportance
      ) {
        return false;
      }

      return true;
    });

    return filteredTodos;
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
          <Analytics todoList={getFilteredTodos()} />
        </div>
        <div className="todolist-body-container">
          {getFilteredTodos().map((todo) => (
            <Todo
              key={todo.id}
              todoInfo={todo}
              isSelected={selectedTodoIds.has(todo.id)}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={showEditForm}
              onSelect={handleSelect}
            />
          ))}
        </div>
        <div className="todolist-body-bulkbuttons">
          <BulkButtons
            onBulkDelete={handleBulkDelete}
            onBulkToggle={handleBulkToggle}
          />
        </div>

        {editFormInfo.showEditForm && renderEditForm()}
        {showSnackbar && <Snackbar />}
      </div>
    </div>
  );
};

export default TodoList;
