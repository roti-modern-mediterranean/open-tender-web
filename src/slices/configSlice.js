import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getConfig } from '../services/requests'
import { defaultConfig } from '../config'
import { defaultTheme } from '../theme'
import { capitalize } from 'open-tender-js'

const baseUrl = process.env.REACT_APP_API_URL
const authUrl = process.env.REACT_APP_AUTH_URL
const clientId = process.env.REACT_APP_CLIENT_ID

// const initialState = {
//   content: defaultConfig,
//   theme: defaultTheme,
// }

const initialState = {
  app: null,
  brand: null,
  content: null,
  theme: null,
  loading: 'idle',
  error: null,
}

export const fetchConfig = createAsyncThunk(
  'config/getConfig',
  async (_, thunkAPI) => {
    try {
      const response = await getConfig()
      const app = { baseUrl, authUrl, clientId }
      return { ...response, app }
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

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
      state = { ...state, ...action.payload, loading: 'idle' }
    },
    [fetchConfig.pending]: (state) => {
      state.loading = 'pending'
    },
    [fetchConfig.rejected]: (state, action) => {
      state.error = action.payload.detail
      state.loading = 'idle'
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
