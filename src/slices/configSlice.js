import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { capitalize } from '@open-tender/js'
import { OpenTenderAPI } from '@open-tender/redux'

const baseUrl = process.env.REACT_APP_API_URL
const authUrl = process.env.REACT_APP_AUTH_URL

const initialState = {
  app: null,
  brand: null,
  content: null,
  theme: null,
  settings: null,
  loading: 'idle',
  error: null,
}

// fetch config via origin
export const fetchConfig = createAsyncThunk(
  'config/getConfig',
  async (_, thunkAPI) => {
    try {
      const options = { baseUrl, authUrl }
      const api = new OpenTenderAPI(options)
      const response = await api.getConfig()
      const brandId = response.brand.brandId
      const clientId = response.clientId
      const app = { baseUrl, authUrl, clientId, brandId }
      return { ...response, app }
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

// fetch config via explicit brandId and clientId
// const clientId = process.env.REACT_APP_CLIENT_ID
// const brandId = process.env.REACT_APP_BRAND_ID
// export const fetchConfig = createAsyncThunk(
//   'config/getConfig',
//   async (_, thunkAPI) => {
//     try {
//       const options = { baseUrl, authUrl, clientId, brandId }
//       const api = new OpenTenderAPI(options)
//       const response = await api.getConfig()
//       const app = { baseUrl, authUrl, clientId, brandId }
//       return { ...response, app }
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err)
//     }
//   }
// )

const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchConfig.fulfilled]: (state, action) => {
      const { app, brand, content, theme, settings } = action.payload
      state.app = app
      state.brand = brand
      state.content = content
      state.theme = theme
      state.settings = settings
      state.loading = 'idle'
      state.api = new OpenTenderAPI(app)
    },
    [fetchConfig.pending]: (state) => {
      state.loading = 'pending'
    },
    [fetchConfig.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = 'idle'
    },
  },
})

export const selectBrand = (state) => state.config.brand
export const selectTheme = (state) => state.config.theme
export const selectConfig = (state) => state.config.content
export const selectSettings = (state) => state.config.settings

export const selectAccountConfig = (state) => state.config.content.account
export const selectOutpostName = (state) =>
  capitalize(state.config.settings.locationName.OUTPOST[0])
export const selectDisplaySettings = (state) => {
  const orderType = state.data.order.orderType || 'OLO'
  return state.config.settings.displaySettings[orderType]
}

export default configSlice.reducer
