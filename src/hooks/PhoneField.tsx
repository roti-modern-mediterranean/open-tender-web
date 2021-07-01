import { Dispatch, SetStateAction, useMemo, useState } from 'react'
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

  const error = useMemo(() => {
    if (required && !value) {
      return {
        hasError: true,
        message: "This field is required",
      };
    }
    if (isPhoneValid(value)) {
      return {
        hasError: false,
        message: undefined,
      };
    }
    return {
      hasError: true,
      message: "Invalid phone",
    };
  }, [required, value]);

  return [value, setValue, error];
};

export default usePhoneFieldState;
