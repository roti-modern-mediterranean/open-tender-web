import { createSlice } from '@reduxjs/toolkit'


// TODO should not be hardcoded (?)
export const eventTypeOptions = [
  { id: "Family / Home", name: "Family / Home"},
  { id: "Corporate / Office", name: "Corporate / Office"},
  { id: "Party / Venue", name: "Party / Venue"}]

// TODO should not be hardcoded (?)
export const validNumberOfPeopleOptions = [10, 20, 30, 50, 75]

// TODO should not be hardcoded (?)
export const numberOfPeopleOptions = ["", ...validNumberOfPeopleOptions.map(value => `${value}`), "100+"]

// TODO should not be hardcoded (?)
export const servingStyleOptions = [
  {value: "individual", name: "Individually packaged meals"},
  {value: "buffet", name: "Family/Buffet style"}]

const initialState = {
  eventType: [],
  numberOfPeopleIndex: 0,
  servingStyle: null
}

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    setEventType: (state, action) => {
      state.eventType = action.payload
    },
    setNumberOfPeopleIndex: (state, action) => {
      state.numberOfPeopleIndex = action.payload
    },
    setServingStyle: (state, action) => {
      state.servingStyle = action.payload
    }
  },
})

export const { setEventType, setNumberOfPeopleIndex, setServingStyle } =
  recommendationsSlice.actions

export const selectEventType = (state) => state.recommendations.eventType
export const selectNumberOfPeopleIndex = (state) => state.recommendations.numberOfPeopleIndex
export const selectNumberOfPeople = (state) => validNumberOfPeopleOptions[selectNumberOfPeopleIndex(state)-1]
export const selectServingStyle = (state) => state.recommendations.servingStyle

export default recommendationsSlice.reducer
