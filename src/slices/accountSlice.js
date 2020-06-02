import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCustomerOrders, getCustomerOrder } from '../services/requests'

export const fetchUpcomingOrders = createAsyncThunk(
  'account/getUpcomingOrders',
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
  'account/getPastOrders',
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
  'account/getOrder',
  async ({ token, orderId }, thunkAPI) => {
    try {
      return await getCustomerOrder(token, orderId)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const initialState = {
  currentOrder: { order: {}, loading: false, error: null },
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
      console.log(action.payload)
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
      console.log(action.payload)
      state.currentOrder = {
        order: {},
        loading: 'idle',
        error: action.payload,
      }
    },
  },
})

export const { resetAccountOrder } = accountSlice.actions

export const selectAccount = (state) => state.account
export const selectUpcomingOrders = (state) => state.account.upcomingOrders
export const selectPastOrders = (state) => state.account.pastOrders
export const selectAccountOrder = (state) => state.account.currentOrder

export default accountSlice.reducer
