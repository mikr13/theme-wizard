import { useEffect, useState } from "react";

export const useHistoryState = <T>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const [lastState, setLastState] = useState(initialState);

  const [history, setHistory] = useState<T[]>([]);
  const [future, setFuture] = useState<T[]>([]);

  useEffect(() => {
    console.log({ state, history, future });
  }, [history, future]);

  const save = () => {
    if (lastState === state) return;
    console.log("save");
    setHistory([...history, lastState]);
    setLastState(state);
    setFuture([]);
  };

  const undo = () => {
    let updatedHistory = [...history];
    if (lastState !== state) {
      updatedHistory = [...history, lastState];
    }
    if (updatedHistory.length === 0) return;

    console.log("undo");
    const current = updatedHistory[updatedHistory.length - 1];

    setFuture([...future, state]);
    setState(current);
    setLastState(current);
    setHistory(updatedHistory.slice(0, updatedHistory.length - 1));
  };

  const redo = () => {
    console.log("redo");
    if (future.length === 0) return;
    const current = future[future.length - 1];

    setHistory([...history, state]);
    setState(current);
    setLastState(current);
    setFuture(future.slice(0, future.length - 1));
  };

  return {
    state,
    set: setState,
    undo,
    canUndo: lastState !== state || history.length > 0,
    redo,
    canRedo: future.length > 0,
    save,
  };
};
