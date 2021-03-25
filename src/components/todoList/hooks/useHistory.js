import { useRef, useCallback } from "react";

export const useHistory = () => {
  const history = useRef({ past: [], present: null, future: [] });

  const initHistory = useCallback((todoList) => {
    history.current.present = todoList;
  }, []);

  const addNewEventToHistory = useCallback((todoList) => {
    history.current = {
      past: [...history.current.past, history.current.present],
      present: todoList,
      future: [],
    };
  }, []);

  const fetchUndoHistory = useCallback(() => {
    if (!history.current.past.length) {
      return null;
    }

    const prevTodoList = history.current.past[history.current.past.length - 1];

    return prevTodoList;
  }, []);

  const removeFromUndoHistory = useCallback(() => {
    const prevTodoList = history.current.past[history.current.past.length - 1];

    history.current = {
      future: [...history.current.future, history.current.present],
      present: prevTodoList,
      past: history.current.past.slice(0, history.current.past.length - 1),
    };
  }, []);

  const fetchRedoHistory = useCallback(() => {
    if (!history.current.future.length) {
      return null;
    }

    const prevTodoList =
      history.current.future[history.current.future.length - 1];

    return prevTodoList;
  }, []);

  const removeFromRedoHistory = useCallback(() => {
    const prevTodoList =
      history.current.future[history.current.future.length - 1];

    history.current = {
      past: [...history.current.past, history.current.present],
      present: prevTodoList,
      future: history.current.future.slice(
        0,
        history.current.future.length - 1
      ),
    };
  }, []);

  return {
    initHistory,
    addNewEventToHistory,
    fetchUndoHistory,
    fetchRedoHistory,
    removeFromUndoHistory,
    removeFromRedoHistory,
  };
};
