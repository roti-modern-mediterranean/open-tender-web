import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postOrderValidate, postOrder } from '../services/requests'
import { handleCheckoutErrors } from '../packages/utils/errors'
import { openModal, closeModal } from './modalSlice'
import { getDefaultTip, prepareOrder } from '../packages/utils/cart'
import { isEmpty } from '../packages/utils/helpers'
import { refreshRevenueCenter } from './orderSlice'
// import { getDefaultTip } from '../packages/utils/cart'

const initialState = {
  check: null,
  form: {
    details: {},
    customer: {},
    address: {},
    discounts: [],
    promoCodes: [],
    tenders: [],
    tip: null,
  },
  completedOrder: null,
  errors: {},
  loading: 'idle',
}

export const validateOrder = createAsyncThunk(
  'checkout/validateOrder',
  async (order, thunkAPI) => {
    try {
      // console.log(JSON.stringify(order, null, 2))
      const response = await postOrderValidate(order)
      const errors = handleCheckoutErrors({ params: response.errors }, false)
      console.log(errors)
      const keys = Object.keys(errors)
      if (keys.includes('revenue_center_id')) {
        const args = {
          revenueCenterId: order.revenue_center_id,
          serviceType: order.service_type,
        }
        thunkAPI.dispatch(refreshRevenueCenter(args))
      } else if (keys.includes('service_type')) {
        console.log(errors.service_type.code)
        // LEFT OFF HERE - NEED TO IMPLEMENT THIS
        // if (errors.service_type.code === 'service_type.switch_service_type') {
        //   thunkAPI.dispatch(switchServiceType())
        // }
      }
      return response
    } catch (err) {
      // console.log(JSON.stringify(err, null, 2))
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const submitOrder = createAsyncThunk(
  'checkout/submitOrder',
  async (_, thunkAPI) => {
    const args = { text: 'Submitting your order...' }
    thunkAPI.dispatch(openModal({ type: 'working', args }))
    // start order assembly
    const { order, checkout } = thunkAPI.getState()
    const { revenueCenter, serviceType, requestedAt, cart } = order
    const { revenue_center_id: revenueCenterId } = revenueCenter || {}
    const { check, form } = checkout
    const {
      customer,
      address,
      details,
      discounts,
      promoCodes,
      tenders,
      tip,
    } = form
    const defaultTip = check ? getDefaultTip(check.config) : null
    const fullAddress = { ...order.address, ...address }
    const data = {
      revenueCenterId,
      serviceType,
      requestedAt,
      cart,
      customer,
      address: isEmpty(fullAddress) ? null : fullAddress,
      details,
      discounts,
      promoCodes,
      tip: tip === null ? defaultTip : tip,
      tenders,
    }
    const preparedOrder = prepareOrder(data)
    // end order assembly
    try {
      // console.log(JSON.stringify(order, null, 2))
      const response = await postOrder(preparedOrder)
      thunkAPI.dispatch(closeModal())
      return response
    } catch (err) {
      // console.log(JSON.stringify(err, null, 2))
      const response = thunkAPI.rejectWithValue(err)
      thunkAPI.dispatch(closeModal())
      return response
    }
  }
)

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: initialState,
  reducers: {
    resetCheckout: () => initialState,
    resetTip: (state) => {
      state.form.tip = null
    },
    resetErrors: (state) => {
      state.errors = {}
    },
    resetCompletedOrder: (state) => {
      state.completedOrder = null
    },
    updateForm: (state, action) => {
      state.form = { ...state.form, ...action.payload }
    },
    updateCustomer: (state, action) => {
      const account = action.payload
      const customer = state.form.customer
      const customerId = customer ? customer.customer_id : null
      if (!account) {
        state.form.discounts = []
        state.form.tenders = []
        if (customerId) {
          state.form.customer = {}
          state.form.promoCodes = []
        }
      } else if (customerId && account.customer_id !== customerId) {
        state.form.customer = customer
        state.form.discounts = []
        state.form.tenders = []
      } else if (account && !customerId) {
        state.form.customer = account
        state.form.discounts = []
        state.form.tenders = []
      }
    },
  },
  extraReducers: {
    // validateOrder

    [validateOrder.fulfilled]: (state, action) => {
      state.check = action.payload
      state.loading = 'idle'
    },
    [validateOrder.pending]: (state) => {
      state.loading = 'pending'
    },
    [validateOrder.rejected]: (state, action) => {
      state.errors = handleCheckoutErrors(action.payload)
      state.loading = 'idle'
      window.scroll(0, 0)
    },

    // submitOrder

    [submitOrder.fulfilled]: (state, action) => {
      state.completedOrder = action.payload
      state.check = null
      state.form = initialState.form
      state.errors = initialState.errors
      state.loading = 'idle'
    },
    [submitOrder.pending]: (state) => {
      state.loading = 'pending'
    },
    [submitOrder.rejected]: (state, action) => {
      state.errors = handleCheckoutErrors(action.payload)
      state.loading = 'idle'
      window.scroll(0, 0)
    },
  },
})

export const {
  resetCheckout,
  resetErrors,
  resetCompletedOrder,
  resetTip,
  updateForm,
  updateCustomer,
} = checkoutSlice.actions

export const selectCheckout = (state) => state.checkout
export const selectCheck = (state) => state.checkout.check
export const selectCompletedOrder = (state) => state.checkout.completedOrder
export const selectDiscounts = (state) => state.checkout.discounts

export default checkoutSlice.reducer
