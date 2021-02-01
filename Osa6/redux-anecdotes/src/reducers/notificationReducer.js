const initialState = {
  text: null,
  timeoutID: null,
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      if(state.timeoutID) {
        clearTimeout(state.timeoutID)
      }
      return { ...state, text: action.data }
    case 'RESET_NOTIFICATION':
      return { ...initialState }
    case 'SET_TIMEOUTID':
      return { ...state, timeoutID: action.data }
    default:
      return state
  }
}

export const setNotification = (text, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: text
    })
    const timeoutID = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION',
        data: null
      })
    }, timeout * 1000)
    dispatch({
      type: 'SET_TIMEOUTID',
      data: timeoutID,
    })
  }
}

export default notificationReducer