import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderType: null,
  serviceType: null,
  location: null,
  requestedAt: 'asap',
  currentItem: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    startOver: () => initialState,
    setOrderType: (state, action) => {
      state.orderType = action.payload
    },
    setServiceType: (state, action) => {
      state.serviceType = action.payload
    },
    setOrderServiceType: (state, action) => {
      const [orderType, serviceType] = action.payload
      state.orderType = orderType
      state.serviceType = serviceType
    },
    setLocation: (state, action) => {
      state.location = action.payload
    },
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload
    },
  },
})

export const {
  startOver,
  setOrderType,
  setServiceType,
  setOrderServiceType,
  setLocation,
  setCurrentItem,
} = orderSlice.actions

export const selectOrder = (state) => state.order
export const selectOrderType = (state) => state.order.orderType
export const selectServiceType = (state) => state.order.serviceType
export const selectLocation = (state) => state.order.location
export const selectRequestedAt = (state) => state.order.requestedAt
export const selectMenuVars = (state) => {
  if (!state.order.location) return {}
  return {
    locationId: state.order.location.revenue_center_id,
    serviceType: state.order.serviceType,
    requestedAt: state.order.requestedAt,
  }
}
export const selectCurrentItem = (state) => state.order.currentItem

export default orderSlice.reducer
