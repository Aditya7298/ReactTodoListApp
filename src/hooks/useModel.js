import { useRef, useCallback } from "react";
import { resolveDatabaseCall } from "../database.js";
import { v4 as uuid } from "uuid";

const useModel = () => {
  const TodoStore = useRef([
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
  ]);

  const readAllTodos = useCallback(() => TodoStore.current, []);

  const readSingleTodo = useCallback(
    (todoId) => TodoStore.current.find((todo) => todo.id === todoId),
    []
  );

  const changeTodoStoreState = useCallback(async (prevTodoStore) => {
    try {
      await resolveDatabaseCall();
      TodoStore.current = prevTodoStore;
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  const createTodo = useCallback(async (title, importance) => {
    try {
      const newTodo = {
        id: uuid(),
        title,
        importance,
        completed: false,
        date: new Date().toDateString(),
      };

      await resolveDatabaseCall();
      TodoStore.current = [...TodoStore.current, newTodo];
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  const editTodo = useCallback(async (todoId, updatedTodo) => {
    try {
      await resolveDatabaseCall();
      TodoStore.current = TodoStore.current.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              title: updatedTodo.title,
              importance: updatedTodo.importance,
            }
          : todo
      );
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  const toggleTodo = useCallback(async (todoId) => {
    try {
      await resolveDatabaseCall();
      TodoStore.current = TodoStore.current.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  const toggleBulkTodos = useCallback(async (todoIds) => {
    try {
      await resolveDatabaseCall();
      TodoStore.current = TodoStore.current.map((todo) =>
        todoIds.includes(todo.id)
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  const deleteTodo = useCallback(async (todoId) => {
    try {
      await resolveDatabaseCall();
      TodoStore.current = TodoStore.current.filter(
        (todo) => todo.id !== todoId
      );
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  const deleteBulkTodos = useCallback(async (todoIds) => {
    try {
      await resolveDatabaseCall();
      TodoStore.current = TodoStore.current.filter(
        (todo) => !todoIds.includes(todo.id)
      );
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  return [
    readAllTodos,
    readSingleTodo,
    changeTodoStoreState,
    createTodo,
    editTodo,
    toggleTodo,
    toggleBulkTodos,
    deleteTodo,
    deleteBulkTodos,
  ];
};

export default useModel;
