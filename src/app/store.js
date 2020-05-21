import { configureStore, combineReducers } from '@reduxjs/toolkit'
import throttle from 'lodash/throttle'
import { loadState, saveState } from '../utils/localStorage'
import configReducer from '../slices/configSlice'
import customerReducer from '../slices/customerSlice'
import modalReducer from '../slices/modalSlice'
import sidebarReducer from '../slices/sidebarSlice'
import orderReducer from '../slices/orderSlice'
import locationsReducer from '../slices/locationsSlice'
import menuReducer from '../slices/menuSlice'
import checkoutReducer from '../slices/checkoutSlice'
import confirmationReducer from '../slices/confirmationSlice'

const rootReducer = combineReducers({
  config: configReducer,
  customer: customerReducer,
  modal: modalReducer,
  sidebar: sidebarReducer,
  order: orderReducer,
  locations: locationsReducer,
  menu: menuReducer,
  checkout: checkoutReducer,
  confirmation: confirmationReducer,
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
