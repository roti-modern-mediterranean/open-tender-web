import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderType: null,
  serviceType: null,
  location: null,
  requestedAt: 'asap',
  currentItem: null,
  cart: [],
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
    addItemToCart: (state, action) => {
      const item = action.payload
      if (typeof item.index === 'undefined') {
        state.cart.push({ ...item, index: state.cart.length })
      } else {
        state.cart[item.index] = item
      }
    },
    removeItemFromCart: (state, action) => {
      state.cart.splice(action.payload, 1)
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
  addItemToCart,
  removeItemFromCart,
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
export const selectCart = (state) => state.order.cart

export default orderSlice.reducer
