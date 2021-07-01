import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { fieldRequiredError, noError, StateError } from './common'


export const isPhoneValid = (value: string) => {
  const regExp = /^\+?[\s.\d]{9,20}$/;
  return regExp.test(value);
};

const invalidPhoneError:StateError = {
  hasError: true,
  message: "Invalid phone",
}

const usePhoneFieldState = (
  initialState: string | (() => string),
  required: boolean = true
): [string, Dispatch<SetStateAction<string>>, StateError] => {
  const [value, setValue] = useState(initialState);

  const error = useMemo(() => {
    if (required && !value) {
      return fieldRequiredError;
    }
    if (isPhoneValid(value)) {
      return noError;
    }
    return invalidPhoneError;
  }, [required, value]);

  return [value, setValue, error];
};

export default usePhoneFieldState;
