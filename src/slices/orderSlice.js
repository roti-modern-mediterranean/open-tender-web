import { createSlice } from '@reduxjs/toolkit'
import {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
} from '../components/packages/utils'

const initialState = {
  orderType: null,
  serviceType: null,
  location: null,
  requestedAt: 'asap',
  currentItem: null,
  cart: [],
  cartCounts: {},
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
      state.currentItem = { ...action.payload }
    },
    addItemToCart: (state, action) => {
      const { cart, cartCounts } = addItem([...state.cart], action.payload)
      state.cart = cart
      state.cartCounts = cartCounts
    },
    removeItemFromCart: (state, action) => {
      const { cart, cartCounts } = removeItem([...state.cart], action.payload)
      state.cart = cart
      state.cartCounts = cartCounts
    },
    incrementItemInCart: (state, action) => {
      const { cart, cartCounts } = incrementItem(
        [...state.cart],
        action.payload
      )
      state.cart = cart
      state.cartCounts = cartCounts
    },
    decrementItemInCart: (state, action) => {
      const { cart, cartCounts } = decrementItem(
        [...state.cart],
        action.payload
      )
      state.cart = cart
      state.cartCounts = cartCounts
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
export const selectCartCounts = (state) => state.order.cartCounts

export default orderSlice.reducer
