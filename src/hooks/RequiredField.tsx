import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { StateError } from './common'


const useRequiredFieldState = <T extends any>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>, StateError] => {
  const [value, setValue] = useState(initialState);

  const error = useMemo(
    () => (value === ""
      ? {
        hasError: true,
        message: "This field is required",
      }
      : { hasError: false, message: undefined }),
    [value],
  );

  return [value, setValue, error];
};

export default useRequiredFieldState;
