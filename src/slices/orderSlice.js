import { createSlice } from '@reduxjs/toolkit'
import { calcPrices } from '../components/packages/utils'

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
    incrementItemInCart: (state, action) => {
      const index = action.payload
      const item = state.cart[index]
      if (item.max === 0 || item.quantity < item.max) {
        let newQuantity = item.quantity + item.increment
        newQuantity =
          item.max === 0 ? newQuantity : Math.min(item.max, newQuantity)
        const newItem = calcPrices({ ...item, quantity: newQuantity })
        state.cart[index] = newItem
      }
    },
    decrementItemInCart: (state, action) => {
      const index = action.payload
      const item = state.cart[index]
      const newQuantity = Math.max(item.quantity - item.increment, 0)
      if (newQuantity === 0) {
        state.cart.splice(index, 1)
      } else {
        const newItem = calcPrices({ ...item, quantity: newQuantity })
        state.cart[index] = newItem
      }
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
  incrementItemInCart,
  decrementItemInCart,
} = orderSlice.actions

export const selectOrder = (state) => state.order
export const selectOrderType = (state) => state.order.orderType
export const selectServiceType = (state) => state.order.serviceType
export const selectLocation = (state) => state.order.location
// TODO: need to replace this
export const selectLocationName = (state) =>
  state.order.location ? state.order.location.store.full_name : null
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
export const selectCartQuantity = (state) =>
  state.order.cart.reduce((t, i) => (t += i.quantity), 0)
export const selectCartTotal = (state) =>
  state.order.cart.reduce((t, i) => (t += i.totalPrice), 0)

export default orderSlice.reducer
