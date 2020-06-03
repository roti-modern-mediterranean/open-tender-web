import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  postLogin,
  postLogout,
  putCustomer,
  getCustomerAllergens,
  putCustomerAllergens,
} from '../services/requests'
import { showNotification } from './notificationSlice'

const initialState = {
  auth: null,
  account: null,
  error: null,
  loading: 'idle',
  favorites: { entities: [], loading: false, error: null },
  addresses: { entities: [], loading: false, error: null },
  allergens: { entities: [], loading: false, error: null },
  cards: { entities: [], loading: false, error: null },
  giftCards: { entities: [], loading: false, error: null },
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

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async ({ token, data }, thunkAPI) => {
    try {
      const response = await putCustomer(token, data)
      thunkAPI.dispatch(showNotification('Account updated!'))
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const fetchCustomerAllergens = createAsyncThunk(
  'customer/fetchCustomerAllergens',
  async (token, thunkAPI) => {
    try {
      return await getCustomerAllergens(token)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const updateCustomerAllergens = createAsyncThunk(
  'customer/updateCustomerAllergens',
  async ({ token, data }, thunkAPI) => {
    try {
      const response = await putCustomerAllergens(token, data)
      thunkAPI.dispatch(showNotification('Allergens updated!'))
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: {
    [loginCustomer.fulfilled]: (state, action) => {
      state.auth = action.payload.auth
      state.account = action.payload.customer
      state.error = null
      state.loading = 'idle'
    },
    [loginCustomer.pending]: (state) => {
      state.loading = 'pending'
    },
    [loginCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = 'idle'
    },
    [logoutCustomer.fulfilled]: () => initialState,
    [logoutCustomer.pending]: (state) => {
      state.loading = 'pending'
    },
    [logoutCustomer.rejected]: () => initialState,
    [updateCustomer.fulfilled]: (state, action) => {
      state.account = action.payload
      state.error = null
      state.loading = 'idle'
    },
    [updateCustomer.pending]: (state) => {
      state.loading = 'pending'
    },
    [updateCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = 'idle'
    },
    [fetchCustomerAllergens.fulfilled]: (state, action) => {
      state.allergens = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [fetchCustomerAllergens.pending]: (state) => {
      state.allergens.loading = 'pending'
    },
    [fetchCustomerAllergens.rejected]: (state, action) => {
      state.allergens = {
        entities: [],
        loading: 'idle',
        error: action.payload.detail,
      }
    },
    [updateCustomerAllergens.fulfilled]: (state, action) => {
      state.allergens = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [updateCustomerAllergens.pending]: (state) => {
      state.allergens.loading = 'pending'
    },
    [updateCustomerAllergens.rejected]: (state, action) => {
      state.allergens = {
        entities: [],
        loading: 'idle',
        error: action.payload.detail,
      }
    },
  },
})

export const selectCustomer = (state) => state.customer
export const selectCustomerAccount = (state) => state.customer.account
export const selectToken = (state) =>
  state.customer.auth ? state.customer.auth.access_token : null
export const selectCustomerAllergens = (state) => state.customer.allergens

export default customerSlice.reducer
