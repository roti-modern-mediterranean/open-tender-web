import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderType: null,
    serviceType: null,
    location: null,
    requestedAt: 'asap',
  },
  reducers: {
    chooseOrderType: (state, action) => {
      state.orderType = action.payload
    },
    chooseServiceType: (state, action) => {
      state.serviceType = action.payload
    },
    chooseOrderServiceType: (state, action) => {
      const [orderType, serviceType] = action.payload
      state.orderType = orderType
      state.serviceType = serviceType
    },
    chooseLocation: (state, action) => {
      state.location = action.payload
    },
  },
})

export const {
  chooseOrderType,
  chooseServiceType,
  chooseOrderServiceType,
  chooseLocation,
} = orderSlice.actions

export const orderType = (state) => state.order.orderType
export const serviceType = (state) => state.order.serviceType
export const location = (state) => state.order.location

export default orderSlice.reducer
