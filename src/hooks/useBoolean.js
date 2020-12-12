import { useCallback, useState } from "react";

/**
 *  A simple hook to manage booleans more easily
 * @param {boolean} initialState
 */
export default function useBoolean(initialState) {
  const [value, setValue] = useState(initialState);

  return {
    value,
    set: setValue,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    toggle: useCallback(() => setValue(!value), []),
    setTrue: useCallback(() => setValue(true), []),
    setFalse: useCallback(() => setValue(false), []),
  };
}
