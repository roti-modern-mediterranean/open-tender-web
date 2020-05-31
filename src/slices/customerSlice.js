import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postLogin, postLogout } from '../services/requests'

const initialState = {
  auth: null,
  account: null,
  error: null,
  loading: 'idle',
}

export const loginCustomer = createAsyncThunk(
  'customer/loginCustomer',
  async ({ email, password }, thunkAPI) => {
    try {
      return await postLogin(email, password)
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const logoutCustomer = createAsyncThunk(
  'customer/logoutCustomer',
  async (token, thunkAPI) => {
    try {
      return await postLogout(token)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    logoutCustomer: () => initialState,
  },
  extraReducers: {
    [loginCustomer.fulfilled]: (state, action) => {
      state.auth = action.payload.auth
      state.account = action.payload.customer
      state.error = null
      state.loading = 'idle'
    },
    [loginCustomer.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [loginCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = 'idle'
    },
    [logoutCustomer.fulfilled]: () => initialState,
    [logoutCustomer.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [logoutCustomer.rejected]: () => initialState,
  },
})

export const selectCustomer = (state) => state.customer
export const selectCustomerAccount = (state) => state.customer.account
export const selectToken = (state) =>
  state.customer.auth ? state.customer.auth.access_token : null

export default customerSlice.reducer
