import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { StateError } from './common'


const useRequiredFieldState = <T extends any>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, StateError] => {
  const [value, setValue] = useState(initialState);
  const startState = useMemo(() => initialState, []);
  const [hasChanged, setHasChanged] = useState(false);
  const forceShowError = useCallback(() => setHasChanged(true), [
    setHasChanged,
  ]);
  const error = useMemo(
    () => (!value
      ? {
        hasError: true,
        message: hasChanged
          ? "This field is required"
          : undefined,
        forceShowError,
      }
      : { hasError: false, message: undefined, forceShowError }),
    [hasChanged, value, forceShowError],
  );

  useEffect(() => {
    if (value !== startState) {
      setHasChanged(true);
    }
  }, [value !== startState]);

  return [value, setValue, error];
};

export default useRequiredFieldState;
