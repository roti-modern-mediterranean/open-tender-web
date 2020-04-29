import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getLocations } from '../services/locations'

// First, create the thunk
export const fetchLocations = createAsyncThunk(
  'locations/getLocations',
  async (rcType) => {
    const response = await getLocations(rcType)
    return response.data
  }
)

// Then, handle actions in your reducers:
const locationsSlice = createSlice({
  name: 'locations',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchLocations.fulfilled]: (state, action) => {
      state.entities = action.payload
    },
  },
})

export const loadingLocations = (state) => state.locations.loading
export const selectLocations = (state) => state.locations.entities

export default locationsSlice.reducer
