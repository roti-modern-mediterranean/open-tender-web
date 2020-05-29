import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getLocation } from '../services/requests'
import {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  calcCartCounts,
} from '../packages/utils/cart'
import {
  serviceTypeNamesMap,
  orderTypeNamesMap,
} from '../packages/utils/constants'
import { timezoneMap, getUserTimezone } from '../packages/utils/datetimes'

const initialState = {
  orderType: null,
  serviceType: null,
  location: null,
  requestedAt: 'asap',
  address: null,
  currentItem: null,
  cart: [],
  cartCounts: {},
  error: null,
  loading: 'idle',
}

export const fetchLocation = createAsyncThunk(
  'order/getLocation',
  async (locationId, thunkAPI) => {
    try {
      return await getLocation(locationId)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: () => initialState,
    resetOrderType: (state) => {
      state.orderType = null
      state.serviceType = null
      state.location = null
    },
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
    setRequestedAt: (state, action) => {
      state.requestedAt = action.payload
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
    setCart: (state, action) => {
      state.cart = action.payload
      state.cartCounts = calcCartCounts(action.payload)
    },
  },
  extraReducers: {
    [fetchLocation.fulfilled]: (state, action) => {
      state.location = action.payload
      state.loading = 'idle'
    },
    [fetchLocation.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [fetchLocation.rejected]: (state, action) => {
      state.error = action.error.detail
      state.loading = 'idle'
    },
  },
})

export const {
  resetOrder,
  resetOrderType,
  setOrderType,
  setServiceType,
  setOrderServiceType,
  setRequestedAt,
  setLocation,
  setAddress,
  setCurrentItem,
  addItemToCart,
  removeItemFromCart,
  incrementItemInCart,
  decrementItemInCart,
  setCart,
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
export const selectTimezone = (state) => {
  return state.order.location
    ? timezoneMap[state.order.location.timezone]
    : getUserTimezone()
}

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

export const selectCanCheckout = (state) =>
  state.order.location && state.order.serviceType && state.order.requestedAt

export default orderSlice.reducer
