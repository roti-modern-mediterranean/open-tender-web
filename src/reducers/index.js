import { combineReducers } from '@reduxjs/toolkit'
import order from './testOrder'
import revenueCenters from './testRevenueCenters'

const testReducer = combineReducers({
  order,
  revenueCenters,
})

export default testReducer
