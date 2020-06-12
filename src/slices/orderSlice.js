import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRevenueCenter, getMenuItems } from '../services/requests'
import {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  calcCartCounts,
  rehydrateCart,
} from '../packages/utils/cart'
import {
  serviceTypeNamesMap,
  orderTypeNamesMap,
} from '../packages/utils/constants'
import { timezoneMap, getUserTimezone } from '../packages/utils/datetimes'
import { setMenuItems } from './menuSlice'
import { openModal } from './modalSlice'

const initialState = {
  orderType: null,
  serviceType: null,
  revenueCenter: null,
  requestedAt: 'asap',
  address: null,
  currentItem: null,
  cart: [],
  cartCounts: {},
  error: null,
  loading: 'idle',
}

export const fetchRevenueCenter = createAsyncThunk(
  'order/fetchRevenueCenter',
  async (revenueCenterId, thunkAPI) => {
    try {
      return await getRevenueCenter(revenueCenterId)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const reorderPastOrder = createAsyncThunk(
  'order/reorderPastOrder',
  async ({ revenueCenterId, serviceType, items }, thunkAPI) => {
    try {
      thunkAPI.dispatch(
        openModal({ type: 'working', args: { text: 'Building your order...' } })
      )
      const revenueCenter = await getRevenueCenter(revenueCenterId)
      const menuItems = await getMenuItems(revenueCenterId, serviceType)
      const { cart, cartCounts } = rehydrateCart(menuItems, items)
      thunkAPI.dispatch(setMenuItems(menuItems))
      thunkAPI.dispatch(openModal({ type: 'requestedAt' }))
      return { revenueCenter, cart, cartCounts }
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
      state.revenueCenter = null
    },
    resetRevenueCenter: (state) => {
      state.revenueCenter = null
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
    setRevenueCenter: (state, action) => {
      state.revenueCenter = action.payload
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
    // fetchRevenueCenter

    [fetchRevenueCenter.fulfilled]: (state, action) => {
      state.revenueCenter = action.payload
      state.loading = 'idle'
    },
    [fetchRevenueCenter.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [fetchRevenueCenter.rejected]: (state, action) => {
      state.error = action.error.detail
      state.loading = 'idle'
    },

    // reorderPastOrder

    [reorderPastOrder.fulfilled]: (state, action) => {
      state.revenueCenter = action.payload.revenueCenter
      state.cart = action.payload.cart
      state.cartCounts = action.payload.cartCounts
      state.loading = 'idle'
    },
    [reorderPastOrder.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [reorderPastOrder.rejected]: (state, action) => {
      state.error = action.error.detail
      state.loading = 'idle'
    },
  },
})

export const {
  resetOrder,
  resetRevenueCenter,
  resetOrderType,
  setOrderType,
  setServiceType,
  setOrderServiceType,
  setRequestedAt,
  setRevenueCenter,
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

export const selectRevenueCenter = (state) => state.order.revenueCenter
// TODO: need to replace this
export const selectRevenueCenterName = (state) =>
  state.order.revenueCenter ? state.order.revenueCenter.name : null
export const selectTimezone = (state) => {
  return state.order.revenueCenter
    ? timezoneMap[state.order.revenueCenter.timezone]
    : getUserTimezone()
}

export const selectAddress = (state) => state.order.address

const makeMenuSlug = (revenueCenter) => {
  if (!revenueCenter) return '/'
  const { slug, revenue_center_type } = revenueCenter
  return `/menu/${slug}-${revenue_center_type.toLowerCase()}`
}
export const selectMenuSlug = (state) => makeMenuSlug(state.order.revenueCenter)

export const selectMenuVars = (state) => {
  if (!state.order.revenueCenter) return {}
  return {
    revenueCenterId: state.order.revenueCenter.revenue_center_id,
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
  state.order.revenueCenter &&
  state.order.serviceType &&
  state.order.requestedAt

export default orderSlice.reducer
