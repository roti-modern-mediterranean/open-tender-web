import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getLocations } from '../services/requests'

const initialState = { locations: [], loading: 'idle', error: null }

export const fetchLocations = createAsyncThunk(
  'locations/getLocations',
  async (rcType, thunkAPI) => {
    try {
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
