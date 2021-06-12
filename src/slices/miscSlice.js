import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  topOffset: null,
  updateAccount: false,
  modalPrefs: {
    greenShug: false,
    outOfStock: false,
  },
}

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setTopOffset: (state, action) => {
      state.topOffset = action.payload
    },
    setUpdateAccount: (state, action) => {
      state.updateAccount = action.payload
    },
    setModalPref: (state, action) => {
      const { modal, pref } = action.payload
      state.modalPrefs = { ...state.modalPrefs, [modal]: pref }
    },
  },
})

export const { setTopOffset, setUpdateAccount, setModalPref } =
  miscSlice.actions

export const selectTopOffset = (state) => state.misc.topOffset
export const selectUpdateAccount = (state) => state.misc.updateAccount
export const selectModalPrefs = (state) => state.misc.modalPrefs

export default miscSlice.reducer
