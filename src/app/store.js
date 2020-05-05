import { configureStore, combineReducers } from '@reduxjs/toolkit'
import throttle from 'lodash/throttle'
import { loadState, saveState } from '../utils/localStorage'
import configReducer from '../slices/configSlice'
import modalReducer from '../slices/modalSlice'
import orderReducer from '../slices/orderSlice'
import locationsReducer from '../slices/locationsSlice'
import menuReducer from '../slices/menuSlice'

const rootReducer = combineReducers({
  config: configReducer,
  modal: modalReducer,
  order: orderReducer,
  locations: locationsReducer,
  menu: menuReducer,
})

const persistedState = loadState()
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
})

store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }, 3000)
)

export default store
