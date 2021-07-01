import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { StateError } from './common'


export const isNumberValid = (value: string) => {
  const regExp = /^\d+(\.\d+)?$/;
  return regExp.test(value);
};

const useNumberFieldState = (
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
    if (isNumberValid(value)) {
      return {
        hasError: false,
        message: undefined,
      };
    }
    return {
      hasError: true,
      message: "Invalid number",
    };
  }, [required, value]);

  return [value, setValue, error];
};

export default useNumberFieldState;
