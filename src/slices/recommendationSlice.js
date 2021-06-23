import { createSlice } from '@reduxjs/toolkit'


// TODO should not be hardcoded (?)
export const eventTypeOptions = [
  { id: "Family", name: "Family"}, { id: "Corporate", name: "Corporate"},
  { id: "Party", name: "Party"}, { id: "Adult", name: "Adult"},
  { id: "Teens", name: "Teens"}, { id: "Kids", name: "Kids"},
  { id: "Indoors", name: "Indoors"}, { id: "Outdoors", name: "Outdoors"},
  { id: "Formal", name: "Formal"}]

const initialState = {
  eventType: [],
  numberOfPeople: 1,
}

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {
    setEventType: (state, action) => {
      state.eventType = action.payload
    },
    setNumberOfPeople: (state, action) => {
      state.numberOfPeople = action.payload
    }
  },
})

export const { setEventType, setNumberOfPeople } =
  recommendationSlice.actions

export const selectEventType = (state) => state.recommendation.eventType
export const selectNumberOfPeople = (state) => state.recommendation.numberOfPeople

export default recommendationSlice.reducer
