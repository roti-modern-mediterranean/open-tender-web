import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getLocations } from '../services/requests'

// First, create the thunk
export const fetchLocations = createAsyncThunk(
  'locations/getLocations',
  async (rcType) => {
    const response = await getLocations(rcType)
    // console.log(response.data)
    return response.data.reduce((arr, i) => {
      const name = i.full_name
      const phone = i.phone_number
      delete i.full_name
      delete i.phone_number
      delete i.dayparts
      return [...arr, { ...i, name, phone }]
    }, [])
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
