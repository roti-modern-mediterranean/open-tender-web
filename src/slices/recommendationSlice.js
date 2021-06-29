import { createSlice } from '@reduxjs/toolkit'


// TODO should not be hardcoded (?)
export const eventTypeOptions = [
  { id: "Family / Home", name: "Family / Home"},
  { id: "Corporate / Office", name: "Corporate / Office"},
  { id: "Party / Venue", name: "Party / Venue"}]

// TODO should not be hardcoded (?)
export const numberOfPeopleOptions = ["1", "10", "20", "30", "50", "75", "100+"]

const initialState = {
  eventType: [],
  numberOfPeopleIndex: 0,
}

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {
    setEventType: (state, action) => {
      state.eventType = action.payload
    },
    setNumberOfPeopleIndex: (state, action) => {
      state.numberOfPeopleIndex = action.payload
    }
  },
})

export const { setEventType, setNumberOfPeopleIndex } =
  recommendationSlice.actions

export const selectEventType = (state) => state.recommendation.eventType
export const selectNumberOfPeopleIndex = (state) => state.recommendation.numberOfPeopleIndex

export default recommendationSlice.reducer
