import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postOrder } from '../services/requests'

export const submitLogin = createAsyncThunk(
  'customer/submitLogin',
  async (order, thunkAPI) => {
    try {
      return await postOrder(order)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    entity: null,
    errors: null,
    loading: 'idle',
  },
  reducers: {},
  extraReducers: {
    [submitLogin.fulfilled]: (state, action) => {
      state.entity = action.payload
      state.errors = null
      state.loading = 'idle'
    },
    [submitLogin.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [submitLogin.rejected]: (state, action) => {
      state.errors = action.payload.params
      state.loading = 'idle'
    },
  },
})

export const selectCustomer = (state) => state.customer.entity

export default customerSlice.reducer
