import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { StateError } from './common'


export const isEmailValid = (email: string) => {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(email.toLowerCase());
};

const useEmailFieldState = (
  initialState: string | (() => string),
  required: boolean = true
): [string, Dispatch<SetStateAction<string>>, StateError] => {
  const [value, setValue] = useState(initialState);
  const startState = useMemo(() => initialState, []);
  const [hasChanged, setHasChanged] = useState(false);
  const forceShowError = useCallback(() => setHasChanged(true), [
    setHasChanged,
  ]);
  const error = useMemo(() => {
    if (required && !value) {
      return {
        hasError: true,
        message: hasChanged
          ? "This field is required"
          : undefined,
        forceShowError,
      };
    }
    if (isEmailValid(value)) {
      return {
        hasError: false,
        message: undefined,
        forceShowError,
      };
    }
    return {
      hasError: true,
      message: hasChanged ? "Invalid email" : undefined,
      forceShowError,
    };
  }, [hasChanged, value, forceShowError]);

  useEffect(() => {
    if (value !== startState) {
      setHasChanged(true);
    }
  }, [value !== startState]);

  return [value, setValue, error];
};

export default useEmailFieldState;
