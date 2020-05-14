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
    errors: null,
    loading: 'idle',
  },
  reducers: {
    updateCheck: (state, action) => {
      // console.log(JSON.stringify(action.payload.customer))
      state.check = { ...state.check, ...action.payload }
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

export const { updateCheck } = checkoutSlice.actions

export const selectCheck = (state) => state.checkout.check

export default checkoutSlice.reducer
