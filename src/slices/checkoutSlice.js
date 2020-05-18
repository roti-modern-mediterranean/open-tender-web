import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postOrder } from '../services/requests'

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
  initialState: {
    check: null,
    form: {
      customer: {},
      discounts: [],
      promoCodes: [],
      tenders: [],
    },
    errors: {},
    loading: 'idle',
  },
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
        if (customerId) state.form.customer = {}
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
    [submitOrder.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.check = action.payload
      state.errors = action.payload.errors || {}
      state.loading = 'idle'
    },
    [submitOrder.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [submitOrder.rejected]: (state, action) => {
      state.errors = action.payload.params
      state.loading = 'idle'
    },
  },
})

export const { updateForm, updateCustomer } = checkoutSlice.actions

export const selectCheckout = (state) => state.checkout
export const selectCheck = (state) => state.checkout.check
export const selectDiscounts = (state) => state.checkout.discounts

export default checkoutSlice.reducer
