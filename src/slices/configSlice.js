import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getConfig } from '../services/requests'
import { defaultConfig } from '../config'
import { defaultTheme } from '../theme'
import { capitalize } from 'open-tender-js'

const initialState = {
  content: defaultConfig,
  theme: defaultTheme,
}

export const fetchConfig = createAsyncThunk('config/getConfig', async () => {
  return await getConfig()
})

// Then, handle actions in your reducers:
const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
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

export const selectTheme = (state) => state.config.theme
export const selectConfig = (state) => state.config.content
export const selectGoogleMapsConfig = (state) => state.config.content.googleMaps
export const selectAccountConfig = (state) => state.config.content.account
export const selectAccountConfigSections = (state) =>
  state.config.content.account.sections
export const selectOutpostName = (state) =>
  capitalize(state.config.content.revenueCenters.locationName.OUTPOST[0])

export default configSlice.reducer
