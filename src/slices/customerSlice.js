import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginCustomer, logoutCustomer } from '../services/requests'

const initialState = {
  auth: null,
  account: null,
  error: null,
  loading: 'idle',
}

export const submitLogin = createAsyncThunk(
  'customer/submitLogin',
  async ({ email, password }, thunkAPI) => {
    try {
      return await loginCustomer(email, password)
    } catch (err) {
      console.log(err.message)
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const submitLogout = createAsyncThunk(
  'customer/submitLogout',
  async (token, thunkAPI) => {
    try {
      return await logoutCustomer(token)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

// export const getCustomer = createAsyncThunk(
//   'customer/getCustomer',
//   async ({ email, password }, thunkAPI) => {
//     try {
//       return await loginCustomer({ email, password })
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err)
//     }
//   }
// )

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    logoutCustomer: () => initialState,
  },
  extraReducers: {
    [submitLogin.fulfilled]: (state, action) => {
      state.auth = action.payload.auth
      state.account = action.payload.customer
      state.error = null
      state.loading = 'idle'
    },
    [submitLogin.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [submitLogin.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = 'idle'
    },
    [submitLogout.fulfilled]: () => initialState,
    [submitLogout.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [submitLogout.rejected]: () => initialState,
  },
})

export const selectCustomer = (state) => state.customer
export const selectAccount = (state) => state.customer.account

export default customerSlice.reducer
