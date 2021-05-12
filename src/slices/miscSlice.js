import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  topOffset: null,
  modalPrefs: {
    greenShug: false,
  },
}

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setTopOffset: (state, action) => {
      state.topOffset = action.payload
    },
    setModalPref: (state, action) => {
      const { modal, pref } = action.payload
      state.modalPrefs = { ...state.modalPrefs, [modal]: pref }
    },
  },
})

export const { setTopOffset, setModalPref } = miscSlice.actions

export const selectTopOffset = (state) => state.misc.topOffset
export const selectModalPrefs = (state) => state.misc.modalPrefs

export default miscSlice.reducer
