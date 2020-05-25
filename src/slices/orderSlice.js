import { createSlice } from '@reduxjs/toolkit'
import {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
} from '../packages/utils'
import { serviceTypeNamesMap, orderTypeNamesMap } from '../packages/constants'

const initialState = {
  orderType: null,
  serviceType: null,
  location: null,
  requestedAt: 'asap',
  address: null,
  currentItem: null,
  cart: [],
  cartCounts: {},
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: () => initialState,
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
    setAddress: (state, action) => {
      state.address = action.payload
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
  resetOrder,
  setOrderType,
  setServiceType,
  setOrderServiceType,
  setLocation,
  setAddress,
  setCurrentItem,
  addItemToCart,
  removeItemFromCart,
  incrementItemInCart,
  decrementItemInCart,
} = orderSlice.actions

export const selectOrder = (state) => state.order
export const selectOrderType = (state) => state.order.orderType
export const selectOrderTypeName = (state) =>
  orderTypeNamesMap[state.order.orderType]
export const selectServiceType = (state) => state.order.serviceType
export const selectServiceTypeName = (state) =>
  serviceTypeNamesMap[state.order.serviceType]
export const selectRequestedAt = (state) =>
  state.order.requestedAt === 'asap' ? 'ASAP' : state.order.requestedAt

export const selectLocation = (state) => state.order.location
// TODO: need to replace this
export const selectLocationName = (state) =>
  state.order.location ? state.order.location.name : null

export const selectAddress = (state) => state.order.address

const makeMenuSlug = (location) => {
  if (!location) return '/'
  const { slug, revenue_center_type } = location
  return `/menu/${slug}-${revenue_center_type.toLowerCase()}`
}
export const selectMenuSlug = (state) => makeMenuSlug(state.order.location)

export const selectMenuVars = (state) => {
  if (!state.order.location) return {}
  return {
    locationId: state.order.location.location_id,
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
