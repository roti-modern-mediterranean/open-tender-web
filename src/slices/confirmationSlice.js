import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  order: null,
}

const confirmationSlice = createSlice({
  name: 'confirmation',
  initialState: initialState,
  reducers: {
    resetConfirmation: () => initialState,
    setConfirmationOrder: (state, action) => {
      state.order = action.payload
    },
  },
})

export const {
  resetConfirmation,
  setConfirmationOrder,
} = confirmationSlice.actions

export const selectConfirmationOrder = (state) => state.confirmation.order

export default confirmationSlice.reducer
