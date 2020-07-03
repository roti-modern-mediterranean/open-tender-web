import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import throttle from 'lodash/throttle'
import { loadState, saveState } from '../utils/localStorage'
import configReducer from '../slices/configSlice'
import geolocationReducer from '../slices/geolocationSlice'
import modalReducer from '../slices/modalSlice'
import sidebarReducer from '../slices/sidebarSlice'
import { openTenderReducer } from 'open-tender-redux'
// import customerReducer from '../slices/customerSlice'
// import orderReducer from '../slices/orderSlice'
// import menuReducer from '../slices/menuSlice'
// import checkoutReducer from '../slices/checkoutSlice'
// import confirmationReducer from '../slices/confirmationSlice'
// import accountReducer from '../slices/accountSlice'
// import notificationReducer from '../slices/notificationSlice'

const rootReducer = combineReducers({
  config: configReducer,
  geolocation: geolocationReducer,
  modal: modalReducer,
  sidebar: sidebarReducer,
  // order: orderReducer,
  // menu: menuReducer,
  // checkout: checkoutReducer,
  // confirmation: confirmationReducer,
  // customer: customerReducer,
  // account: accountReducer,
  // notification: notificationReducer,
  data: openTenderReducer,
})

const persistedState = loadState()

const customizedMiddleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
})

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: customizedMiddleware,
})

store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }, 3000)
)

export default store
