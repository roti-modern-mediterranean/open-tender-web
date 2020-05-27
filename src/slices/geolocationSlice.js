import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  latLng: null,
  error: null,
}

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    resetGeolocation: () => initialState,
    setGeoLatLng: (state, action) => {
      state.latLng = action.payload
      state.error = null
    },
    setGeoError: (state, action) => {
      state.latLng = null
      state.error = action.payload
    },
  },
})

export const {
  resetGeolocation,
  setGeoLatLng,
  setGeoError,
} = geolocationSlice.actions

export const selectGeoLatLng = (state) => state.geolocation.latLng

export default geolocationSlice.reducer
