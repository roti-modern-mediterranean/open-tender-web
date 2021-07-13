import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'

// TODO change to real state (remove any's)
type State = any

export const useSingleOption = <T,>(optionsSelector:(state:State)=>T|null):T[] => {
  const option = useSelector<State,T|null>(optionsSelector)
  return useMemo<T[]>(()=>(option === null ? [] : [option]), [option])
}

export const useSetSingleOption = <T,>(action:(option:T|null)=>State) => {
  const dispatch = useDispatch()

  return useCallback((payload:T[]) => dispatch(action(payload.length === 0 ? null : payload[0])), [dispatch, action])
}
