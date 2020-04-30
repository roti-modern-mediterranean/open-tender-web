import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getConfig } from '../services/config'
import { defaultConfig } from '../config'

export const fetchConfig = createAsyncThunk('config/getConfig', async () => {
  return await getConfig()
})

// Then, handle actions in your reducers:
const configSlice = createSlice({
  name: 'config',
  initialState: defaultConfig,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchConfig.fulfilled]: (state, action) => {
      state = action.payload
    },
  },
})

export const selectConfig = (state) => state.config

export default configSlice.reducer
