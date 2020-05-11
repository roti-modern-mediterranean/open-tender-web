import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postOrder } from '../services/calls'

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
    order: null,
    errors: null,
    loading: 'idle',
  },
  reducers: {
    updateOrder: (state, action) => {
      state.order = { ...state.order, ...action.payload }
    },
  },
  extraReducers: {
    [submitOrder.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.order = action.payload
      state.loading = 'idle'
      state.error = null
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

export const { updateOrder } = checkoutSlice.actions

export const selectCheckoutOrder = (state) => state.checkout.order

export default checkoutSlice.reducer
