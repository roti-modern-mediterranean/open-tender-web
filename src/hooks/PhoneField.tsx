import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { StateError } from './common'


export const isPhoneValid = (value: string) => {
  const regExp = /^\+?[\s.\d]{9,20}$/;
  return regExp.test(value);
};

const usePhoneFieldState = (
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
    if (isPhoneValid(value)) {
      return {
        hasError: false,
        message: undefined,
        forceShowError,
      };
    }
    return {
      hasError: true,
      message: hasChanged ? "Invalid phone" : undefined,
      forceShowError,
    };
  }, [required, hasChanged, value, forceShowError]);

  useEffect(() => {
    if (value !== startState) {
      setHasChanged(true);
    }
  }, [value !== startState]);

  return [value, setValue, error];
};

export default usePhoneFieldState;
