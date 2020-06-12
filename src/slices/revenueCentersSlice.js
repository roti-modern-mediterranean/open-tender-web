import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRevenueCenters } from '../services/requests'
import { addDistance } from '../packages/utils/maps'

const initialState = { revenueCenters: [], loading: 'idle', error: null }

export const fetchRevenueCenters = createAsyncThunk(
  'revenueCenters/getRevenueCenters',
  async ({ revenue_center_type, lat, lng }, thunkAPI) => {
    try {
      if (lat) lat = parseFloat(lat).toFixed(7)
      if (lng) lng = parseFloat(lng).toFixed(7)
      const response = await getRevenueCenters(revenue_center_type, lat, lng)
      let revenueCenters = []
      if (lat && lng) {
        const address = { lat: lat, lng: lng }
        revenueCenters = addDistance(response.data, address)
      } else {
        revenueCenters = response.data
      }
      return revenueCenters
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const revenueCentersSlice = createSlice({
  name: 'revenueCenters',
  initialState,
  reducers: {
    resetRevenueCenters: () => initialState,
  },
  extraReducers: {
    [fetchRevenueCenters.fulfilled]: (state, action) => {
      state.revenueCenters = action.payload
      state.loading = 'idle'
    },
    [fetchRevenueCenters.pending]: (state) => {
      state.loading = 'pending'
    },
    [fetchRevenueCenters.rejected]: (state, action) => {
      // TODO: this might not be right
      state.errors = action.payload.params
      state.loading = 'idle'
    },
  },
})

export const { resetRevenueCenters } = revenueCentersSlice.actions

export const selectRevenueCenters = (state) => state.revenueCenters

export default revenueCentersSlice.reducer
