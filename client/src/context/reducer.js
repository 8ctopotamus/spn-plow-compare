import { LS_KEY } from './index'

const updateLocalStorage = state => {
  if (window && window.localStorage) {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  }
}

export default (state, action) => {
  let updatedState
  let foundIdx
  switch(action.type) {
    case 'UPDATE_COMPARE':
      foundIdx = state.compare.findIndex(p => p.ID === action.payload.ID)
      updatedState = {
        ...state,
        compare: foundIdx > -1
          ? state.compare.filter(p => p.ID !== action.payload.ID)
          : [...state.compare, action.payload]
      }
      return updatedState
    case 'UPDATE_SEARCH':
      updatedState = {
        ...state,
        search: action.payload,
      }
      return updatedState
    case 'GET_LOCALSTORAGE':
      if (window && window.localStorage && localStorage.getItem(LS_KEY)) {
        return JSON.parse(localStorage.getItem(LS_KEY))
      }
    default:
      return state
  }
}