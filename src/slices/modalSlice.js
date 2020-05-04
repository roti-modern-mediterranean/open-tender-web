import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: null,
  type: null,
}

const modalSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openModal: (state, action) => {
      document.body.classList.add('has-modal')
      state.type = action.payload
    },
    closeModal: (state) => {
      document.body.classList.remove('has-modal')
      state.type = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export const selectModal = (state) => state.modal

export default modalSlice.reducer
