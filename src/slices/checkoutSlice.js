import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postOrderValidate, postOrder } from '../services/requests'
import { handleOrderErrors } from '../packages/utils/cart'

const initialState = {
  check: null,
  form: {
    details: {},
    customer: {},
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
      return await postOrderValidate(order)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const submitOrder = createAsyncThunk(
  'checkout/submitOrder',
  async (order, thunkAPI) => {
    try {
      return await postOrder(order)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: initialState,
  reducers: {
    updateForm: (state, action) => {
      state.form = { ...state.form, ...action.payload }
    },
    updateCustomer: (state, action) => {
      const account = action.payload
      const customer = state.form.customer
      const customerId = customer ? customer.customer_id : null
      if (!account) {
        state.form.discounts = []
        if (customerId) {
          state.form.customer = {}
          state.form.promoCodes = []
        }
      } else if (customerId && account.customer_id !== customerId) {
        state.form.customer = customer
        state.form.discounts = []
      } else if (account && !customerId) {
        state.form.customer = account
        state.form.discounts = []
      }
    },
    clearCompletedOrder: (state) => {
      state.completedOrder = null
    },
  },
  extraReducers: {
    [validateOrder.fulfilled]: (state, action) => {
      // console.log('validateOrder.fulfilled', action.payload)
      state.check = action.payload
      state.errors = action.payload.errors
        ? handleOrderErrors(action.payload.errors)
        : {}
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
    [submitOrder.fulfilled]: (state, action) => {
      // console.log('submitOrder.fulfilled', action.payload)
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
      state.errors = handleOrderErrors(action.payload)
      state.loading = 'idle'
    },
  },
})

export const {
  updateForm,
  updateCustomer,
  clearCompletedOrder,
} = checkoutSlice.actions

export const selectCheckout = (state) => state.checkout
export const selectCheck = (state) => state.checkout.check
export const selectCompletedOrder = (state) => state.checkout.completedOrder
export const selectDiscounts = (state) => state.checkout.discounts

export default checkoutSlice.reducer
