import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import locationsReducer from '../features/locations/locationsSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    locations: locationsReducer,
  },
})
