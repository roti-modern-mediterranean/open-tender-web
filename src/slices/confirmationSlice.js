import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  completedOrder: null,
}

const confirmationSlice = createSlice({
  name: 'confirmation',
  initialState: initialState,
  reducers: {
    resetConfirmation: () => initialState,
    setCompletedOrder: (state, action) => {
      state.completedOrder = action.payload
    },
  },
})

export const {
  resetConfirmation,
  setCompletedOrder,
} = confirmationSlice.actions

export const selectCompletedOrder = (state) => state.confirmation.completedOrder

export default confirmationSlice.reducer
