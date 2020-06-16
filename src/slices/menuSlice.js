import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMenu, getMenuItems, getAllergens } from '../services/requests'
import { refreshRevenueCenter } from './orderSlice'

const makeRequestedIso = (requestedAt) => {
  return !requestedAt || requestedAt === 'asap'
    ? new Date().toISOString()
    : requestedAt
}

export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (menuVars, thunkAPI) => {
    console.log('menuVars', menuVars)
    const { revenueCenterId, serviceType, requestedAt } = menuVars
    try {
      const requestedIso = makeRequestedIso(requestedAt)
      const menu = await getMenu(revenueCenterId, serviceType, requestedIso)
      return { ...menu, menuVars }
    } catch (err) {
      const args = { revenueCenterId, serviceType, requestedAt }
      thunkAPI.dispatch(refreshRevenueCenter(args))
      return thunkAPI.rejectWithValue(err)
    }
  }
)

// export const refreshMenu = createAsyncThunk(
//   'order/refreshMenu',
//   async ({ revenueCenterId, serviceType, requestedAt }, thunkAPI) => {
//     try {
//       // thunkAPI.dispatch(openModal(mc.updatingRevenueCenter))
//       const revenueCenter = await getRevenueCenter(revenueCenterId)
//       const firstTimes = makeFirstTimes(revenueCenter, serviceType, requestedAt)
//       if (!firstTimes) {
//         thunkAPI.dispatch(openModal(mc.closed))
//       } else {
//         const args = { type: 'adjustRequestedAt', args: { firstTimes } }
//         thunkAPI.dispatch(openModal(args))
//       }
//     } catch (err) {
//       return thunkAPI.dispatch(resetRevenueCenter)
//     }
//   }
// )

export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async ({ revenueCenterId, serviceType }, thunkAPI) => {
    try {
      return await getMenuItems(revenueCenterId, serviceType)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const fetchAllergens = createAsyncThunk(
  'account/fetchAllergens',
  async (_, thunkAPI) => {
    try {
      const response = await getAllergens()
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const initialState = {
  menuVars: null,
  previousMenuVars: null,
  categories: [],
  soldOut: [],
  cartErrors: null,
  error: null,
  loading: 'idle',
  selectedAllergens: null,
  menuItems: { entities: [], loading: false, error: null },
  allergens: { entities: [], loading: false, error: null },
}

const menuSlice = createSlice({
  name: 'menu',
  initialState: initialState,
  reducers: {
    setCartErrors: (state, action) => {
      state.cartErrors = action.payload
    },
    resetCartErrors: (state, action) => {
      state.cartErrors = null
    },
    setMenuItems: (state, action) => {
      state.menuItems.entities = action.payload
    },
    setSelectedAllergens: (state, action) => {
      state.selectedAllergens = action.payload
    },
  },
  extraReducers: {
    //menus

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
      console.log(action)
      const { detail, message } = action.payload
      state.error = detail || message
      state.loading = 'idle'
    },

    // menu items

    [fetchMenuItems.fulfilled]: (state, action) => {
      state.menuItems = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [fetchMenuItems.pending]: (state) => {
      state.menuItems.loading = 'pending'
    },
    [fetchMenuItems.rejected]: (state, action) => {
      const error = action.payload
        ? action.payload.detail
        : 'Something went wrong'
      state.menuItems = { entities: [], loading: 'idle', error }
    },

    // allergens

    [fetchAllergens.fulfilled]: (state, action) => {
      state.allergens = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [fetchAllergens.pending]: (state) => {
      state.allergens.loading = 'pending'
    },
    [fetchAllergens.rejected]: (state, action) => {
      state.allergens = {
        entities: [],
        loading: 'idle',
        error: action.payload.detail,
      }
    },
  },
})

export const {
  setCartErrors,
  resetCartErrors,
  setMenuItems,
  setSelectedAllergens,
} = menuSlice.actions

export const selectMenu = (state) => state.menu
export const selectMenuLoading = (state) => state.menu.loading === 'pending'
export const selectMenuError = (state) => state.menu.error
export const selectCartErrors = (state) => state.menu.cartErrors
export const selectMenuItems = (state) => state.menu.menuItems
export const selectAllergens = (state) => state.menu.allergens
export const selectedAllergenNames = (state) => {
  const { allergens, selectedAllergens } = state.menu
  if (
    !allergens.entities.length ||
    !selectedAllergens ||
    !selectedAllergens.length
  ) {
    return []
  }
  return selectedAllergens.map((i) => {
    const allergen = allergens.entities.find(
      (a) => a.allergen_id === i.allergen_id
    )
    return allergen.name
  })
}

export default menuSlice.reducer
