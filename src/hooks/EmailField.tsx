import { Dispatch, SetStateAction, useMemo, useState } from 'react'
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

  const error = useMemo(() => {
    if (required && !value) {
      return {
        hasError: true,
        message: "This field is required",
      };
    }
    if (isEmailValid(value)) {
      return {
        hasError: false,
        message: undefined,
      };
    }
    return {
      hasError: true,
      message: "Invalid email",
    };
  }, [value]);

  return [value, setValue, error];
};

export default useEmailFieldState;
