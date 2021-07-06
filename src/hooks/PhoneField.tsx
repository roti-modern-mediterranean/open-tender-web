import { useCallback, useMemo, useState } from 'react'
import { fieldRequiredError, noError, StateError } from './common'
import { makePhone } from '@open-tender/js'


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
): [string, (newValue:string)=>void, StateError] => {
  const [value, _setValue] = useState(initialState);
  const setValue = useCallback((newValue:string)=>_setValue(newValue.split("-").join("")), [_setValue])

  const error = useMemo(() => {
    if (required && !value) {
      return fieldRequiredError;
    }
    if (isPhoneValid(value)) {
      return noError;
    }
    return invalidPhoneError;
  }, [required, value]);

  return [makePhone(value), setValue, error];
};

export default usePhoneFieldState;
