import { CHANGE_DATES, CHANGE_SELECT } from '../constants'
import { DateUtils } from 'react-day-picker'

const initState = {
  dates: { from: null, to: null },
  selected: []
}

export default (filtersState = initState, action) => {
  const { type, payload } = action
  console.log('action', action)
  let newState = { ...filtersState }
  switch (type) {
    case CHANGE_DATES:
      const newDates = DateUtils.addDayToRange(payload.date, newState.dates)
      return { ...newState, dates: newDates }

    case CHANGE_SELECT:
      newState.selected = payload.selected
      return newState

    default:
      return newState
  }
}
