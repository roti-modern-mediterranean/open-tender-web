import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import configReducer from '../slices/configSlice'
import orderReducer from '../slices/orderSlice'
import locationsReducer from '../slices/locationsSlice'
import menuReducer from '../slices/menuSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    config: configReducer,
    order: orderReducer,
    locations: locationsReducer,
    menu: menuReducer,
  },
})
