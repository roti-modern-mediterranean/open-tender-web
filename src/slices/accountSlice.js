import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getCustomerOrders,
  getCustomerOrder,
  getCustomerAllergens,
  postCustomerAllergens,
} from '../services/requests'

export const fetchOrders = createAsyncThunk(
  'account/fetchOrders',
  async ({ token, limit }, thunkAPI) => {
    try {
      const response = await getCustomerOrders(token, null, limit)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const fetchUpcomingOrders = createAsyncThunk(
  'account/fetchUpcomingOrders',
  async ({ token, limit }, thunkAPI) => {
    try {
      const response = await getCustomerOrders(token, 'FUTURE', limit)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const fetchPastOrders = createAsyncThunk(
  'account/fetchPastOrders',
  async ({ token, limit }, thunkAPI) => {
    try {
      const response = await getCustomerOrders(token, 'PAST', limit)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const fetchOrder = createAsyncThunk(
  'account/fetchOrder',
  async ({ token, orderId }, thunkAPI) => {
    try {
      return await getCustomerOrder(token, orderId)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const fetchCustomerAllergens = createAsyncThunk(
  'account/fetchCustomerAllergens',
  async (token, thunkAPI) => {
    try {
      return await getCustomerAllergens(token)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const updateCustomerAllergens = createAsyncThunk(
  'account/updateCustomerAllergens',
  async ({ token, data }, thunkAPI) => {
    try {
      return await postCustomerAllergens(token, data)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const initialState = {
  currentOrder: { order: {}, loading: false, error: null },
  orders: { entities: [], loading: false, error: null },
  upcomingOrders: { entities: [], loading: false, error: null },
  pastOrders: { entities: [], loading: false, error: null },
  favorites: { entities: [], loading: false, error: null },
  addresses: { entities: [], loading: false, error: null },
  allergens: { entities: [], loading: false, error: null },
  cards: { entities: [], loading: false, error: null },
  giftCards: { entities: [], loading: false, error: null },
}

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    resetAccountOrder: (state) => {
      state.currentOrder = initialState.currentOrder
    },
  },
  extraReducers: {
    [fetchOrders.fulfilled]: (state, action) => {
      state.orders = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [fetchOrders.pending]: (state) => {
      state.orders.loading = 'pending'
    },
    [fetchOrders.rejected]: (state, action) => {
      state.orders = {
        entities: [],
        loading: 'idle',
        error: action.payload.detail,
      }
    },
    [fetchUpcomingOrders.fulfilled]: (state, action) => {
      state.upcomingOrders = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [fetchUpcomingOrders.pending]: (state) => {
      state.upcomingOrders.loading = 'pending'
    },
    [fetchUpcomingOrders.rejected]: (state, action) => {
      state.upcomingOrders = {
        entities: [],
        loading: 'idle',
        error: action.payload.detail,
      }
    },
    [fetchPastOrders.fulfilled]: (state, action) => {
      state.pastOrders = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [fetchPastOrders.pending]: (state) => {
      state.pastOrders.loading = 'pending'
    },
    [fetchPastOrders.rejected]: (state, action) => {
      state.pastOrders = {
        entities: [],
        loading: 'idle',
        error: action.payload.detail,
      }
    },
    [fetchOrder.fulfilled]: (state, action) => {
      state.currentOrder = {
        order: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [fetchOrder.pending]: (state) => {
      state.currentOrder.loading = 'pending'
    },
    [fetchOrder.rejected]: (state, action) => {
      state.currentOrder = {
        order: {},
        loading: 'idle',
        error: action.payload,
      }
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

export const { resetAccountOrder } = accountSlice.actions

export const selectAccount = (state) => state.account
export const selectUpcomingOrders = (state) => state.account.upcomingOrders
export const selectPastOrders = (state) => state.account.pastOrders
export const selectAccountOrders = (state) => state.account.orders
export const selectAccountOrder = (state) => state.account.currentOrder
export const selectCustomerAllergens = (state) => state.account.allergens

export default accountSlice.reducer
