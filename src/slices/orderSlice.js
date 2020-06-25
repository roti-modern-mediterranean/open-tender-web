import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRevenueCenter, getMenuItems } from '../services/requests'
import {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  calcCartCounts,
  rehydrateCart,
  rehydrateCheckoutForm,
} from '../packages/utils/cart'
import {
  serviceTypeNamesMap,
  orderTypeNamesMap,
} from '../packages/utils/constants'
import {
  timezoneMap,
  getUserTimezone,
  makeFirstRequestedAt,
  makeFirstTimes,
  makeRequestedAtStr,
} from '../packages/utils/datetimes'
import { setMenuItems } from './menuSlice'
import { openModal, closeModal } from './modalSlice'
import { modalConfig as mc } from '../components/modals/config'
import { updateForm } from './checkoutSlice'
import { toggleSidebar } from './sidebarSlice'
import { makeRandomNumberString } from '../packages/utils/helpers'

const initialState = {
  orderId: null,
  orderType: null,
  serviceType: null,
  isOutpost: false,
  revenueCenter: null,
  requestedAt: 'asap',
  address: null,
  currentItem: null,
  cart: [],
  cartCounts: {},
  messages: [],
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

export const refreshRevenueCenter = createAsyncThunk(
  'order/refreshRevenueCenter',
  async ({ revenueCenterId, serviceType, requestedAt }, thunkAPI) => {
    try {
      const revenueCenter = await getRevenueCenter(revenueCenterId)
      const firstTimes = makeFirstTimes(revenueCenter, serviceType, requestedAt)
      const { status } = revenueCenter
      if (!firstTimes || status !== 'OPEN') {
        const args = { type: 'closed', args: { status, preventClose: true } }
        thunkAPI.dispatch(openModal(args))
      } else {
        const args = {
          type: 'adjustRequestedAt',
          args: { firstTimes, revenueCenter, preventClose: true },
        }
        thunkAPI.dispatch(openModal(args))
      }
    } catch (err) {
      return thunkAPI.dispatch(resetRevenueCenter)
    }
  }
)

export const editOrder = createAsyncThunk(
  'order/editOrder',
  async (order, thunkAPI) => {
    try {
      thunkAPI.dispatch(openModal(mc.buildOrder))
      const {
        order_id: orderId,
        order_type: orderType,
        service_type: serviceType,
        requested_at: requestedAt,
        revenue_center,
        address,
      } = order
      const revenueCenterId = revenue_center.revenue_center_id
      const revenueCenter = await getRevenueCenter(revenueCenterId)
      const menuItems = await getMenuItems(revenueCenterId, serviceType)
      const { cart, cartCounts } = rehydrateCart(menuItems, order.cart)
      thunkAPI.dispatch(setMenuItems(menuItems))
      const form = rehydrateCheckoutForm(order)
      thunkAPI.dispatch(updateForm(form))
      thunkAPI.dispatch(closeModal())
      thunkAPI.dispatch(toggleSidebar())
      const isOutpost = revenueCenter.is_outpost
      return {
        orderId,
        orderType,
        serviceType,
        isOutpost,
        revenueCenter,
        requestedAt,
        address,
        cart,
        cartCounts,
      }
    } catch (err) {
      console.log(err)
      thunkAPI.dispatch(closeModal())
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const reorderPastOrder = createAsyncThunk(
  'order/reorderPastOrder',
  async ({ revenueCenterId, serviceType, items }, thunkAPI) => {
    try {
      thunkAPI.dispatch(openModal(mc.buildOrder))
      const revenueCenter = await getRevenueCenter(revenueCenterId)
      const requestedAt = makeFirstRequestedAt(revenueCenter, serviceType)
      if (!requestedAt) {
        const { status } = revenueCenter
        thunkAPI.dispatch(
          openModal({ type: 'closed', args: { status, isCancel: true } })
        )
        return null
      } else {
        thunkAPI.dispatch(resetRevenueCenter())
        const menuItems = await getMenuItems(revenueCenterId, serviceType)
        const { cart, cartCounts } = rehydrateCart(menuItems, items)
        thunkAPI.dispatch(setMenuItems(menuItems))
        thunkAPI.dispatch(
          openModal({
            type: 'requestedAt',
            args: { onCloseAction: toggleSidebar },
          })
        )
        return { revenueCenter, requestedAt, cart, cartCounts }
      }
    } catch (err) {
      thunkAPI.dispatch(closeModal())
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const makeMessage = (message) => {
  return { message, id: makeRandomNumberString() }
}

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
    showMessage: (state, action) => {
      state.messages.unshift(makeMessage(action.payload))
    },
    hideMessage: (state, action) => {
      state.messages = state.messages.filter((i) => i.id !== action.payload)
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload
    },
    setServiceType: (state, action) => {
      state.serviceType = action.payload
    },
    setOrderServiceType: (state, action) => {
      const [orderType, serviceType, isOutpost] = action.payload
      state.orderType = orderType
      state.serviceType = serviceType
      state.isOutpost = isOutpost || false
    },
    setRevenueCenter: (state, action) => {
      state.revenueCenter = action.payload
      const previousRequestedAt = state.requestedAt
      const requestedAt = makeFirstRequestedAt(
        action.payload,
        state.serviceType,
        previousRequestedAt
      )
      const otherMessages = state.messages.filter(
        (i) => !i.message.includes('Requested time')
      )
      if (requestedAt !== previousRequestedAt) {
        const tz = timezoneMap[action.payload.timezone]
        const requestedAtText = makeRequestedAtStr(requestedAt, tz)
        const msg = `Requested time updated to ${requestedAtText}`
        state.messages = [makeMessage(msg), ...otherMessages]
      } else {
        state.messages = otherMessages
      }
      state.requestedAt = requestedAt
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
    [fetchRevenueCenter.pending]: (state) => {
      state.loading = 'pending'
    },
    [fetchRevenueCenter.rejected]: (state, action) => {
      state.error = action.error.detail
      state.loading = 'idle'
    },

    // refreshRevenueCenter

    [refreshRevenueCenter.fulfilled]: (state, action) => {
      if (action.payload) {
        const { revenueCenter, requestedAt } = action.payload
        state.revenueCenter = revenueCenter
        state.requestedAt = requestedAt
      }
      state.loading = 'idle'
    },
    [refreshRevenueCenter.pending]: (state) => {
      state.loading = 'pending'
    },
    [refreshRevenueCenter.rejected]: (state, action) => {
      state.error = action.error.detail
      state.loading = 'idle'
    },

    // editOrder

    [editOrder.fulfilled]: (state, action) => {
      const {
        orderId,
        orderType,
        serviceType,
        revenueCenter,
        requestedAt,
        address,
        cart,
        cartCounts,
      } = action.payload
      state.orderId = orderId
      state.orderType = orderType
      state.serviceType = serviceType
      state.revenueCenter = revenueCenter
      state.requestedAt = requestedAt
      state.address = address
      state.cart = cart
      state.cartCounts = cartCounts
      state.loading = 'idle'
    },
    [editOrder.pending]: (state) => {
      state.loading = 'pending'
    },
    [editOrder.rejected]: (state, action) => {
      state.error = action.error.detail
      state.loading = 'idle'
    },

    // reorderPastOrder

    [reorderPastOrder.fulfilled]: (state, action) => {
      if (action.payload) {
        const { revenueCenter, requestedAt, cart, cartCounts } = action.payload
        state.revenueCenter = revenueCenter
        state.requestedAt = requestedAt
        state.cart = cart
        state.cartCounts = cartCounts
      }
      state.loading = 'idle'
    },
    [reorderPastOrder.pending]: (state) => {
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
  showMessage,
  hideMessage,
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

export const selectAutoSelect = (state) => {
  const rcConfig = state.config.revenueCenters
  const { orderType, serviceType } = state.order
  return orderType && serviceType
    ? rcConfig.autoSelect[orderType][serviceType]
    : false
}

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
export const selectCartQuantity = (state) => {
  return state.order.cart
    ? state.order.cart.reduce((t, i) => (t += i.quantity), 0)
    : 0
}
export const selectCartTotal = (state) => {
  return state.order.cart
    ? state.order.cart.reduce((t, i) => (t += i.totalPrice), 0.0)
    : 0.0
}
export const selectCartCounts = (state) => state.order.cartCounts || {}

export const selectCanCheckout = (state) =>
  state.order.revenueCenter &&
  state.order.serviceType &&
  state.order.requestedAt

export const selectMessages = (state) => state.order.messages

export default orderSlice.reducer
