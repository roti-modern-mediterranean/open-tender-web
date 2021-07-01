import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { fieldRequiredError, noError, StateError } from './common'

const useRequiredFieldState = <T extends any>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, StateError] => {
  const [value, setValue] = useState(initialState);

  const error = useMemo(
    () => (value === ""
      ? fieldRequiredError
      : noError),
    [value],
  );

  return [value, setValue, error];
};

export default useRequiredFieldState;
