import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCustomerOrders } from '../services/requests'

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

const initialState = {
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
  reducers: {},
  extraReducers: {
    [fetchUpcomingOrders.fulfilled]: (state, action) => {
      state.upcomingOrders = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [fetchUpcomingOrders.pending]: (state, action) => {
      state.upcomingOrders.loading = 'pending'
    },
    [fetchUpcomingOrders.rejected]: (state, action) => {
      console.log(action)
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
    [fetchPastOrders.pending]: (state, action) => {
      state.pastOrders.loading = 'pending'
    },
    [fetchPastOrders.rejected]: (state, action) => {
      state.pastOrders = {
        entities: [],
        loading: 'idle',
        error: action.payload.detail,
      }
    },
  },
})

// export const {  } = accountSlice.actions

export const selectAccount = (state) => state.account

export default accountSlice.reducer
