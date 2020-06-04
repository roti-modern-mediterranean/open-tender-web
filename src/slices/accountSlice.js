import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCustomerOrders, getCustomerOrder } from '../services/requests'

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

const initialState = {
  currentAddress: { address: {}, loading: 'idle', error: null },
  currentOrder: { order: {}, loading: 'idle', error: null },
  orders: { entities: [], loading: 'idle', error: null },
  upcomingOrders: { entities: [], loading: 'idle', error: null },
  pastOrders: { entities: [], loading: 'idle', error: null },
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetAccount: () => initialState,
    resetAccountOrder: (state) => {
      state.currentOrder = initialState.currentOrder
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress.address = action.payload
    },
    resetCurrentAddress: (state) => {
      state.currentAddress = initialState.currentAddress
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
  },
})

export const {
  resetAccount,
  resetAccountOrder,
  setCurrentAddress,
  resetCurrentAddress,
} = accountSlice.actions

export const selectAccount = (state) => state.account
export const selectUpcomingOrders = (state) => state.account.upcomingOrders
export const selectPastOrders = (state) => state.account.pastOrders
export const selectAccountOrders = (state) => state.account.orders
export const selectAccountOrder = (state) => state.account.currentOrder
export const selectAccountAddress = (state) => state.account.currentAddress

export default accountSlice.reducer
