import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getLocations } from '../services/requests'

const initialState = { locations: [], loading: 'idle', error: null }

export const fetchLocations = createAsyncThunk(
  'locations/getLocations',
  async ({ revenue_center_type, lat, lng }, thunkAPI) => {
    try {
      if (lat) lat = parseFloat(lat).toFixed(7)
      if (lng) lng = parseFloat(lng).toFixed(7)
      const response = await getLocations(revenue_center_type, lat, lng)
      console.log(response.data)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    resetLocations: () => initialState,
  },
  extraReducers: {
    [fetchLocations.fulfilled]: (state, action) => {
      state.locations = action.payload
      state.loading = 'idle'
    },
    [fetchLocations.pending]: (state) => {
      state.loading = 'pending'
    },
    [fetchLocations.rejected]: (state, action) => {
      // TODO: this might not be right
      state.errors = action.payload.params
      state.loading = 'idle'
    },
  },
})

export const { resetLocations } = locationsSlice.actions

export const selectLocations = (state) => state.locations

export default locationsSlice.reducer
