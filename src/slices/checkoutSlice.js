import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postOrderValidate, postOrder } from '../services/requests'
import { handleCheckoutErrors } from '../packages/utils/errors'
import { openModal, closeModal } from './modalSlice'
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
  isSubmitting: false,
  completedOrder: null,
  errors: {},
  loading: 'idle',
}

export const validateOrder = createAsyncThunk(
  'checkout/validateOrder',
  async (order, thunkAPI) => {
    try {
      // console.log(JSON.stringify(order, null, 2))
      return await postOrderValidate(order)
    } catch (err) {
      // console.log(JSON.stringify(err, null, 2))
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const submitOrder = createAsyncThunk(
  'checkout/submitOrder',
  async (order, thunkAPI) => {
    const args = { text: 'Submitting your order...' }
    thunkAPI.dispatch(openModal({ type: 'working', args }))
    try {
      // console.log(JSON.stringify(order, null, 2))
      const response = await postOrder(order)
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
    clearErrors: (state) => {
      state.errors = {}
    },
    clearCompletedOrder: (state) => {
      state.completedOrder = null
    },
    resetTip: (state) => {
      state.form.tip = null
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
    toggleSubmitting: (state) => {
      state.isSubmitting = !state.isSubmitting
    },
  },
  extraReducers: {
    // validateOrder

    [validateOrder.fulfilled]: (state, action) => {
      state.check = action.payload
      // if (!state.form.tip) {
      //   state.form.tip = getDefaultTip(action.payload.config)
      // }
      // state.form.discounts = action.payload.discounts
      // state.errors = action.payload.errors
      //   ? handleCheckoutErrors(action.payload.errors)
      //   : {}
      state.loading = 'idle'
    },
    [validateOrder.pending]: (state) => {
      state.loading = 'pending'
    },
    [validateOrder.rejected]: (state, action) => {
      // TODO: this might not be right
      state.errors = action.payload.params
      state.loading = 'idle'
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
      const { detail, params, message } = action.payload
      state.errors = params
        ? handleCheckoutErrors(params)
        : { form: detail || message }
      state.loading = 'idle'
      window.scroll(0, 0)
    },
  },
})

export const {
  clearErrors,
  clearCompletedOrder,
  resetTip,
  updateForm,
  updateCustomer,
} = checkoutSlice.actions

export const selectCheckout = (state) => state.checkout
export const selectCheck = (state) => state.checkout.check
export const selectCompletedOrder = (state) => state.checkout.completedOrder
export const selectDiscounts = (state) => state.checkout.discounts

export default checkoutSlice.reducer
