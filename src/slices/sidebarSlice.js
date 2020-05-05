import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { toggleSidebar } = sidebarSlice.actions

export const selectSidebar = (state) => state.sidebar

export default sidebarSlice.reducer
