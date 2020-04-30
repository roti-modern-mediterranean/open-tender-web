import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderType: null,
  serviceType: null,
  location: null,
  requestedAt: 'asap',
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    startOver: () => initialState,
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
  startOver,
  chooseOrderType,
  chooseServiceType,
  chooseOrderServiceType,
  chooseLocation,
} = orderSlice.actions

export const selectOrder = (state) => state.order
export const selectOrderType = (state) => state.order.orderType
export const selectServiceType = (state) => state.order.serviceType
export const selectLocation = (state) => state.order.location

export default orderSlice.reducer
