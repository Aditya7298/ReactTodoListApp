import { resolveDatabaseCall } from "./database.js";
import { v4 as uuid } from "uuid";

let TodoStore = [
  {
    id: "1",
    title: "Water the plants",
    importance: "Do now!!!",
    completed: true,
    date: new Date("02/10/2021").toDateString(),
  },
  {
    id: "2",
    title: "Learn Javascript",
    importance: "Do tomorrow!!",
    completed: true,
    date: new Date("02/11/2021").toDateString(),
  },
  {
    id: "3",
    title: "Sleep",
    importance: "Do soon!",
    completed: false,
    date: new Date("02/12/2021").toDateString(),
  },
];

const readAllTodos = () => {
  return TodoStore;
};

const readSingleTodo = (todoId) => {
  const selectedTodo = TodoStore.find((todo) => todo.id === todoId);
  return selectedTodo;
};

const readFilteredTodos = (filteredImportance, filteredDate) => {
  const filteredTodos = TodoStore.filter((todo) => {
    filteredDate =
      filteredDate === "" ? "" : new Date(filteredDate).toDateString();

    if (filteredDate !== "" && todo.date !== filteredDate) {
      return false;
    }

    if (filteredImportance !== "" && todo.importance !== filteredImportance) {
      return false;
    }

    return true;
  });

  return filteredTodos;
};

const changeTodoStoreState = async (prevTodoStore) => {
  try {
    await resolveDatabaseCall();
    TodoStore = prevTodoStore;
    return true;
  } catch (err) {
    return false;
  }
};

const createTodo = async (title, importance) => {
  try {
    const newTodo = {
      id: uuid(),
      title,
      importance,
      completed: false,
      date: new Date().toDateString(),
    };

    await resolveDatabaseCall();
    TodoStore = [...TodoStore, newTodo];
    return true;
  } catch (err) {
    return false;
  }
};

const editTodo = async (todoId, updatedTodo) => {
  try {
    await resolveDatabaseCall();
    TodoStore = TodoStore.map((todo) =>
      todo.id === todoId ? { ...todo, ...updatedTodo } : todo
    );
    return true;
  } catch (err) {
    return false;
  }
};

const toggleTodo = async (todoId) => {
  try {
    await resolveDatabaseCall();
    TodoStore = TodoStore.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    return true;
  } catch (err) {
    return false;
  }
};

const toggleBulkTodos = async (todoIds) => {
  try {
    await resolveDatabaseCall();
    TodoStore = TodoStore.map((todo) =>
      todoIds.includes(todo.id) ? { ...todo, completed: !todo.completed } : todo
    );
    return true;
  } catch (err) {
    return false;
  }
};

const deleteTodo = async (todoId) => {
  try {
    await resolveDatabaseCall();
    TodoStore = TodoStore.filter((todo) => todo.id !== todoId);
    return true;
  } catch (err) {
    return false;
  }
};

const deleteBulkTodos = async (todoIds) => {
  try {
    await resolveDatabaseCall();
    TodoStore = TodoStore.filter((todo) => !todoIds.includes(todo.id));
    return true;
  } catch (err) {
    return false;
  }
};

const model = {
  readAllTodos,
  readSingleTodo,
  readFilteredTodos,
  changeTodoStoreState,
  createTodo,
  editTodo,
  toggleTodo,
  toggleBulkTodos,
  deleteTodo,
  deleteBulkTodos,
};

export default model;
