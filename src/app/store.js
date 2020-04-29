import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import orderReducer from '../slices/orderSlice'
import locationsReducer from '../slices/locationsSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    order: orderReducer,
    locations: locationsReducer,
  },
})
