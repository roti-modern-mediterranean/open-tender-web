import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  postLogin,
  postLogout,
  getCustomer,
  putCustomer,
  getCustomerAllergens,
  putCustomerAllergens,
  getCustomerAddresses,
  putCustomerAddress,
  deleteCustomerAddress,
  getCustomerCreditCards,
  postCustomerCreditCard,
  putCustomerCreditCard,
  deleteCustomerCreditCard,
  getCustomerFavorites,
  postCustomerFavorite,
  deleteCustomerFavorite,
} from '../services/requests'
import { showNotification } from './notificationSlice'
import { makeFavoritesLookup } from '../packages/utils/cart'

const initialState = {
  auth: null,
  account: null,
  error: null,
  loading: 'idle',
  addresses: { entities: [], loading: 'idle', error: null },
  allergens: { entities: [], loading: 'idle', error: null },
  creditCards: { entities: [], loading: 'idle', error: null },
  favorites: { entities: [], signatures: [], loading: 'idle', error: null },
  giftCards: { entities: [], loading: 'idle', error: null },
}

export const loginCustomer = createAsyncThunk(
  'customer/loginCustomer',
  async ({ email, password }, thunkAPI) => {
    try {
      return await postLogin(email, password)
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const logoutCustomer = createAsyncThunk(
  'customer/logoutCustomer',
  async (token, thunkAPI) => {
    try {
      return await postLogout(token)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const fetchCustomer = createAsyncThunk(
  'customer/fetchCustomer',
  async ({ token }, thunkAPI) => {
    try {
      return await getCustomer(token)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async ({ token, data }, thunkAPI) => {
    try {
      const response = await putCustomer(token, data)
      thunkAPI.dispatch(showNotification('Account updated!'))
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const fetchCustomerAllergens = createAsyncThunk(
  'customer/fetchCustomerAllergens',
  async (token, thunkAPI) => {
    try {
      return await getCustomerAllergens(token)
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const updateCustomerAllergens = createAsyncThunk(
  'customer/updateCustomerAllergens',
  async ({ token, data }, thunkAPI) => {
    try {
      console.log(data)
      const response = await putCustomerAllergens(token, data)
      thunkAPI.dispatch(showNotification('Allergens updated!'))
      return response
    } catch (err) {
      console.log(err)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const fetchCustomerAddresses = createAsyncThunk(
  'customer/fetchCustomerAddresses',
  async ({ token, limit }, thunkAPI) => {
    try {
      const response = await getCustomerAddresses(token, limit)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const updateCustomerAddress = createAsyncThunk(
  'customer/updateCustomerAddress',
  async ({ token, addressId, data, callback }, thunkAPI) => {
    try {
      await putCustomerAddress(token, addressId, data)
      const limit = thunkAPI.getState().customer.addresses.entities.length
      const response = await getCustomerAddresses(token, limit)
      if (callback) callback()
      thunkAPI.dispatch(showNotification('Address updated!'))
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const removeCustomerAddress = createAsyncThunk(
  'customer/removeCustomerAddress',
  async ({ token, addressId, callback }, thunkAPI) => {
    try {
      await deleteCustomerAddress(token, addressId)
      const limit = thunkAPI.getState().customer.addresses.entities.length
      const response = await getCustomerAddresses(token, limit)
      if (callback) callback()
      thunkAPI.dispatch(showNotification('Address removed!'))
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const fetchCustomerCreditCards = createAsyncThunk(
  'customer/fetchCustomerCreditCards',
  async ({ token }, thunkAPI) => {
    try {
      const response = await getCustomerCreditCards(token)
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const updateCustomerCreditCard = createAsyncThunk(
  'customer/updateCustomerCreditCard',
  async ({ token, cardId, data, callback }, thunkAPI) => {
    try {
      await putCustomerCreditCard(token, cardId, data)
      const response = await getCustomerCreditCards(token)
      if (callback) callback()
      thunkAPI.dispatch(showNotification('Credit card updated!'))
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const removeCustomerCreditCard = createAsyncThunk(
  'customer/removeCustomerCreditCard',
  async ({ token, cardId, callback }, thunkAPI) => {
    try {
      await deleteCustomerCreditCard(token, cardId)
      const response = await getCustomerCreditCards(token)
      if (callback) callback()
      thunkAPI.dispatch(showNotification('Credit card removed!'))
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const addCustomerCreditCard = createAsyncThunk(
  'customer/addCustomerCreditCard',
  async ({ token, data, callback }, thunkAPI) => {
    try {
      await postCustomerCreditCard(token, data)
      const response = await getCustomerCreditCards(token)
      if (callback) callback()
      thunkAPI.dispatch(showNotification('Credit card added!'))
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const fetchCustomerFavorites = createAsyncThunk(
  'customer/fetchCustomerFavorites',
  async ({ token, limit }, thunkAPI) => {
    try {
      const response = await getCustomerFavorites(token, limit)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const addCustomerFavorite = createAsyncThunk(
  'customer/addCustomerFavorite',
  async ({ token, data, callback }, thunkAPI) => {
    try {
      if (!data.name) data.name = ''
      await postCustomerFavorite(token, data)
      const response = await getCustomerFavorites(token)
      if (callback) callback()
      thunkAPI.dispatch(showNotification('Favorite added!'))
      return response.data
    } catch (err) {
      const errMsg = err.detail || err.message || 'Something went wrong'
      thunkAPI.dispatch(showNotification(errMsg))
    }
  }
)

export const removeCustomerFavorite = createAsyncThunk(
  'customer/removeCustomerFavorite',
  async ({ token, favoriteId, callback }, thunkAPI) => {
    try {
      await deleteCustomerFavorite(token, favoriteId)
      const response = await getCustomerFavorites(token)
      if (callback) callback()
      thunkAPI.dispatch(showNotification('Favorite removed!'))
      return response.data
    } catch (err) {
      const errMsg = err.detail || err.message || 'Something went wrong'
      thunkAPI.dispatch(showNotification(errMsg))
    }
  }
)

const accountFields = [
  'customer_id',
  'first_name',
  'last_name',
  'email',
  'phone',
  'company',
]

const makeCustomerAccount = (customer) => {
  return accountFields.reduce(
    (obj, field) => ({ ...obj, [field]: customer[field] }),
    {}
  )
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: {
    // login

    [loginCustomer.fulfilled]: (state, action) => {
      const { allergens = [], gift_cards = [] } = action.payload.customer
      state.auth = action.payload.auth
      state.account = makeCustomerAccount(action.payload.customer)
      state.allergens.entities = allergens
      state.giftCards.entities = gift_cards
      // state.favorites.entities = favorites
      // state.favorites.lookup = makeFavoritesLookup(favorites)
      state.error = null
      state.loading = 'idle'
    },
    [loginCustomer.pending]: (state) => {
      state.loading = 'pending'
    },
    [loginCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = 'idle'
    },

    [logoutCustomer.fulfilled]: () => initialState,
    [logoutCustomer.pending]: (state) => {
      state.loading = 'pending'
    },
    [logoutCustomer.rejected]: () => initialState,

    // customer

    [fetchCustomer.fulfilled]: (state, action) => {
      const { allergens = [], gift_cards = [] } = action.payload
      state.account = makeCustomerAccount(action.payload)
      state.allergens.entities = allergens
      state.giftCards.entities = gift_cards
      // state.favorites.entities = favorites
      // state.favorites.lookup = makeFavoritesLookup(favorites)
      state.error = null
      state.loading = 'idle'
    },
    [fetchCustomer.pending]: (state) => {
      state.loading = 'pending'
    },
    [fetchCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = 'idle'
    },

    [updateCustomer.fulfilled]: (state, action) => {
      state.account = action.payload
      state.error = null
      state.loading = 'idle'
    },
    [updateCustomer.pending]: (state) => {
      state.loading = 'pending'
    },
    [updateCustomer.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = 'idle'
    },

    // allergens

    [fetchCustomerAllergens.fulfilled]: (state, action) => {
      state.allergens = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [fetchCustomerAllergens.pending]: (state) => {
      state.allergens.loading = 'pending'
    },
    [fetchCustomerAllergens.rejected]: (state, action) => {
      state.allergens = {
        entities: [],
        loading: 'idle',
        error: action.payload.detail,
      }
    },
    [updateCustomerAllergens.fulfilled]: (state, action) => {
      state.allergens = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [updateCustomerAllergens.pending]: (state) => {
      state.allergens.loading = 'pending'
    },
    [updateCustomerAllergens.rejected]: (state, action) => {
      state.allergens = {
        entities: [],
        loading: 'idle',
        error: action.payload.detail,
      }
    },

    // addresses

    [fetchCustomerAddresses.fulfilled]: (state, action) => {
      state.addresses = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [fetchCustomerAddresses.pending]: (state) => {
      state.addresses.loading = 'pending'
    },
    [fetchCustomerAddresses.rejected]: (state, action) => {
      state.addresses = {
        entities: [],
        loading: 'idle',
        error: action.payload.detail,
      }
    },

    [updateCustomerAddress.fulfilled]: (state, action) => {
      state.addresses = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [updateCustomerAddress.pending]: (state) => {
      state.addresses.loading = 'pending'
    },
    [updateCustomerAddress.rejected]: (state, action) => {
      state.addresses = {
        entities: state.addresses.entities,
        loading: 'idle',
        error: action.payload,
      }
    },

    [removeCustomerAddress.fulfilled]: (state, action) => {
      state.addresses = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [removeCustomerAddress.pending]: (state) => {
      state.addresses.loading = 'pending'
    },
    [removeCustomerAddress.rejected]: (state, action) => {
      state.addresses = {
        entities: state.addresses.entities,
        loading: 'idle',
        error: action.payload.detail,
      }
    },

    // credit cards

    [fetchCustomerCreditCards.fulfilled]: (state, action) => {
      state.creditCards = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [fetchCustomerCreditCards.pending]: (state) => {
      state.creditCards.loading = 'pending'
    },
    [fetchCustomerCreditCards.rejected]: (state, action) => {
      state.creditCards = {
        entities: [],
        loading: 'idle',
        error: action.payload.detail,
      }
    },

    [updateCustomerCreditCard.fulfilled]: (state, action) => {
      state.creditCards = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [updateCustomerCreditCard.pending]: (state) => {
      state.creditCards.loading = 'pending'
    },
    [updateCustomerCreditCard.rejected]: (state, action) => {
      state.creditCards = {
        entities: state.creditCards.entities,
        loading: 'idle',
        error: action.payload.detail,
      }
    },

    [removeCustomerCreditCard.fulfilled]: (state, action) => {
      state.creditCards = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [removeCustomerCreditCard.pending]: (state) => {
      state.creditCards.loading = 'pending'
    },
    [removeCustomerCreditCard.rejected]: (state, action) => {
      state.creditCards = {
        entities: state.creditCards.entities,
        loading: 'idle',
        error: action.payload.detail,
      }
    },

    [addCustomerCreditCard.fulfilled]: (state, action) => {
      state.creditCards = {
        entities: action.payload,
        loading: 'idle',
        error: null,
      }
    },
    [addCustomerCreditCard.pending]: (state) => {
      state.creditCards.loading = 'pending'
    },
    [addCustomerCreditCard.rejected]: (state, action) => {
      state.creditCards = {
        entities: state.creditCards.entities,
        loading: 'idle',
        error: action.payload,
      }
    },

    // favorties

    [fetchCustomerFavorites.fulfilled]: (state, action) => {
      // console.log('favorites', action.payload)
      state.favorites = {
        entities: action.payload,
        lookup: makeFavoritesLookup(action.payload),
        loading: 'idle',
        error: null,
      }
    },
    [fetchCustomerFavorites.pending]: (state) => {
      state.favorites.loading = 'pending'
    },
    [fetchCustomerFavorites.rejected]: (state, action) => {
      state.favorites = {
        ...state.favorites,
        loading: 'idle',
        error: action.payload.detail,
      }
    },

    [addCustomerFavorite.fulfilled]: (state, action) => {
      state.favorites = {
        entities: action.payload,
        lookup: makeFavoritesLookup(action.payload),
        loading: 'idle',
        error: null,
      }
    },
    [addCustomerFavorite.pending]: (state) => {
      state.favorites.loading = 'pending'
    },
    [addCustomerFavorite.rejected]: (state, action) => {
      state.favorites = {
        ...state.favorites,
        loading: 'idle',
        error: action.payload.detail,
      }
    },

    [removeCustomerFavorite.fulfilled]: (state, action) => {
      state.favorites = {
        entities: action.payload,
        lookup: makeFavoritesLookup(action.payload),
        loading: 'idle',
        error: null,
      }
    },
    [removeCustomerFavorite.pending]: (state) => {
      state.favorites.loading = 'pending'
    },
    [removeCustomerFavorite.rejected]: (state, action) => {
      state.favorites = {
        ...state.favorites,
        loading: 'idle',
        error: action.payload.detail,
      }
    },
  },
})

export const selectCustomer = (state) => state.customer
export const selectCustomerAccount = (state) => state.customer.account
export const selectToken = (state) =>
  state.customer.auth ? state.customer.auth.access_token : null
export const selectCustomerAllergens = (state) => state.customer.allergens
export const selectCustomerAddresses = (state) => state.customer.addresses
export const selectCustomerGiftCards = (state) => state.customer.giftCards
export const selectCustomerCreditCards = (state) => state.customer.creditCards
export const selectCustomerFavorites = (state) => state.customer.favorites

export default customerSlice.reducer
