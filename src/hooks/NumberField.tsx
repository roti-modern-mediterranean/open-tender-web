import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { fieldRequiredError, noError, StateError } from './common'


export const isNumberValid = (value: string) => {
  const regExp = /^\d+(\.\d+)?$/;
  return regExp.test(value);
};

const invalidNumberError:StateError = {
  hasError: true,
  message: "Invalid number",
}

const useNumberFieldState = (
  initialState: string | (() => string),
  required: boolean = true
): [string, Dispatch<SetStateAction<string>>, StateError] => {
  const [value, setValue] = useState(initialState);

  const error = useMemo(() => {
    if (required && !value) {
      return fieldRequiredError;
    }
    if (isNumberValid(value)) {
      return noError;
    }
    return invalidNumberError;
  }, [required, value]);

  return [value, setValue, error];
};

export default useNumberFieldState;
