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
    discounts: [],
    errors: null,
    loading: 'idle',
  },
  reducers: {
    updateCheck: (state, action) => {
      // console.log(JSON.stringify(action.payload.customer))
      state.check = { ...state.check, ...action.payload }
    },
    updateDiscounts: (state, action) => {
      // console.log(JSON.stringify(action.payload.customer))
      state.discounts = action.payload
    },
  },
  extraReducers: {
    [submitOrder.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.check = action.payload
      state.errors = null
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

export const { updateCheck, updateDiscounts } = checkoutSlice.actions

export const selectCheckout = (state) => state.checkout
export const selectCheck = (state) => state.checkout.check
export const selectDiscounts = (state) => state.checkout.discounts

export default checkoutSlice.reducer
