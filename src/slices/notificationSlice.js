import { createSlice } from '@reduxjs/toolkit'
import { makeRandomNumberString } from 'open-tender-js'

const initialState = {
  messages: [],
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const message = {
        message: action.payload,
        id: makeRandomNumberString(),
      }
      // state.messages.unshift(message)
      state.messages.push(message)
    },
    hideNotification: (state, action) => {
      state.messages = state.messages.filter((i) => i.id !== action.payload)
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const selectNotifications = (state) => state.notification.messages

export default notificationSlice.reducer
