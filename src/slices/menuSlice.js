import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMenu } from '../services/requests'

const makeRequestedIso = (requestedAt) => {
  return requestedAt === 'asap' ? new Date().toISOString() : requestedAt
}

export const fetchMenu = createAsyncThunk('menu/getMenu', async (menuVars) => {
  const [locationId, serviceType, requestedAt] = menuVars
  try {
    const requestedIso = makeRequestedIso(requestedAt)
    const menu = await getMenu(locationId, serviceType, requestedIso)
    return { ...menu, menuVars: { locationId, serviceType, requestedAt } }
  } catch (err) {
    throw new Error(err.detail || err.message)
  }
})

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuVars: null,
    previousMenuVars: null,
    categories: [],
    soldOut: [],
    cartErrors: null,
    error: null,
    loading: 'idle',
  },
  reducers: {
    setCartErrors: (state, action) => {
      state.cartErrors = action.payload
    },
    resetCartErrors: (state, action) => {
      state.cartErrors = null
    },
  },
  extraReducers: {
    [fetchMenu.fulfilled]: (state, action) => {
      state.categories = action.payload.menu
      state.soldOut = action.payload.sold_out_items
      if (state.menuVars) state.previousMenuVars = state.menuVars
      state.menuVars = action.payload.menuVars
      state.loading = 'idle'
      state.error = null
    },
    [fetchMenu.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [fetchMenu.rejected]: (state, action) => {
      state.error = action.error.message
      state.loading = 'idle'
    },
  },
})

export const { setCartErrors, resetCartErrors } = menuSlice.actions

export const selectMenu = (state) => state.menu
export const selectMenuLoading = (state) => state.menu.loading === 'pending'
export const selectMenuError = (state) => state.menu.error
export const selectCartErrors = (state) => state.menu.cartErrors

export default menuSlice.reducer
