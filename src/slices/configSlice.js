import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getConfig } from '../services/requests'
import { defaultConfig } from '../config'
import { capitalize } from 'open-tender-js'

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
export const selectGoogleMapsConfig = (state) => state.config.googleMaps
export const selectAccountConfig = (state) => state.config.account
export const selectAccountConfigSections = (state) =>
  state.config.account.sections
export const selectOutpostName = (state) =>
  capitalize(state.config.revenueCenters.locationName.OUTPOST[0])

export default configSlice.reducer
