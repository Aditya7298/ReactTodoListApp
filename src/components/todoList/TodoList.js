import { useState, useEffect, useCallback, useMemo } from "react";
import { importanceFilter, completionFilter } from "../../constants";
import { Todo } from "../todo/Todo";
import { EditForm } from "../editForm/EditForm";
import { Navbar } from "../navbar/Navbar";
import { AddForm } from "../addForm/AddForm";
import { FilterForm } from "../filterForm/FilterForm";
import { Analytics } from "../analytics/Analytics";
import { BulkButtons } from "../bulkButtons/BulkButtons";
import { Snackbar } from "../snackbar/Snackbar";
import { useHistory } from "./hooks/useHistory";
import { useModel } from "./hooks/useModel";
import "./TodoList.css";

export const TodoList = () => {
  const [todoList, setTodoList] = useState([]);

  const [editFormInfo, setEditFormInfo] = useState({
    showEditForm: false,
    boundTodoId: null,
  });

  const [filterInfo, setFilterInfo] = useState({
    importance: importanceFilter.ALL,
    date: "",
    completion: completionFilter.ALL,
  });

  const [selectedTodoIds, setSelectedTodoIds] = useState(new Set());

  const [showSnackbar, setShowSnackbar] = useState(false);

  const {
    readAllTodos,
    readSingleTodo,
    changeTodoStoreState,
    createTodo,
    editTodo,
    toggleTodo,
    toggleBulkTodos,
    deleteTodo,
    deleteBulkTodos,
  } = useModel();

  const {
    initHistory,
    addNewEventToHistory,
    fetchUndoHistory,
    fetchRedoHistory,
    removeFromUndoHistory,
    removeFromRedoHistory,
  } = useHistory();

  const filteredTodos = useMemo(
    () =>
      todoList.filter((todo) => {
        const filteredDate =
            filterInfo.date === ""
              ? ""
              : new Date(filterInfo.date).toDateString(),
          filteredImportance = filterInfo.importance;

        const filteredCompletion =
          filterInfo.completion === completionFilter.ALL
            ? completionFilter.ALL
            : filterInfo.completion === completionFilter.COMPLETED
            ? true
            : false;

        if (
          (filteredDate !== "" && todo.date !== filteredDate) ||
          (filteredImportance !== importanceFilter.ALL &&
            todo.importance !== filteredImportance) ||
          (filteredCompletion !== completionFilter.ALL &&
            todo.completed !== filteredCompletion)
        ) {
          return false;
        }

        return true;
      }),
    [todoList, filterInfo]
  );

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
        if (todoIds.length > 0) {
          const currTodoList = readAllTodos();
          addNewEventToHistory(currTodoList);
          setTodoList(currTodoList);
          setSelectedTodoIds(new Set());
        }
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
        if (todoIds.length > 0) {
          const currTodoList = readAllTodos();
          setTodoList(currTodoList);
          addNewEventToHistory(currTodoList);
          setSelectedTodoIds(new Set());
        }
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

  const handlefilter = useCallback(
    (filteredImportance, filteredDate, filterCompletion) => {
      setFilterInfo({
        importance: filteredImportance,
        date: filteredDate,
        completion: filterCompletion,
      });
    },
    []
  );

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

  return (
    <div className="todolist">
      <div className="todolist-header">
        <Navbar />
      </div>
      <div className="todolist-body">
        <div className="todolist-body-sidebar">
          <AddForm onAdd={handleAdd} />
          <FilterForm onFilter={handlefilter} />
          <Analytics todoList={filteredTodos} />
        </div>
        <div className="todolist-body-container">
          {filteredTodos.map((todo) => (
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
