import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  postLogin,
  postLogout,
  putCustomer,
  getCustomerAllergens,
  putCustomerAllergens,
  getCustomerAddresses,
  putCustomerAddress,
} from '../services/requests'
import { showNotification } from './notificationSlice'

const initialState = {
  auth: null,
  account: null,
  error: null,
  loading: 'idle',
  addresses: { entities: [], loading: 'idle', error: null },
  allergens: { entities: [], loading: 'idle', error: null },
  cards: { entities: [], loading: 'idle', error: null },
  favorites: { entities: [], loading: 'idle', error: null },
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
      const response = await putCustomerAllergens(token, data)
      thunkAPI.dispatch(showNotification('Allergens updated!'))
      return response
    } catch (err) {
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
      const limit = thunkAPI.getState().customer.addresses.entities.length
      await putCustomerAddress(token, addressId, data)
      const response = await getCustomerAddresses(token, limit)
      if (callback) callback()
      thunkAPI.dispatch(showNotification('Address updated!'))
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
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
    [loginCustomer.fulfilled]: (state, action) => {
      const {
        allergens,
        credit_cards,
        favorites,
        gift_cards,
      } = action.payload.customer
      state.auth = action.payload.auth
      state.account = makeCustomerAccount(action.payload.customer)
      state.allergens.entities = allergens || []
      state.cards.entities = credit_cards || []
      state.favorites.entities = favorites || []
      state.giftCards.entities = gift_cards || []
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
      console.log(action.payload)
      state.addresses = {
        entities: state.addresses.entities,
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

export default customerSlice.reducer
