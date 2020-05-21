import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postOrderValidate, postOrder } from '../services/requests'
import { handleOrderErrors } from '../packages/utils'

const initialState = {
  check: null,
  completedOrder: null,
  form: {
    details: {},
    customer: {},
    discounts: [],
    promoCodes: [],
    tenders: [],
    tip: null,
  },
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
      // console.log(JSON.stringify(action.payload.customer))
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
    // updateDiscounts: (state, action) => {
    //   // console.log(JSON.stringify(action.payload.customer))
    //   state.discounts = action.payload
    // },
  },
  extraReducers: {
    [validateOrder.fulfilled]: (state, action) => {
      console.log(action.payload)
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
      console.log(action.payload)
      state = { ...initialState }
      state.completedOrder = action.payload
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

export const { updateForm, updateCustomer } = checkoutSlice.actions

export const selectCheckout = (state) => state.checkout
export const selectCheck = (state) => state.checkout.check
export const selectCompletedOrder = (state) => state.checkout.completedOrder
export const selectDiscounts = (state) => state.checkout.discounts

export default checkoutSlice.reducer
