const initialState = {
  text: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return { text: action.data }
    case 'RESET_NOTIFICATION':
      return { text: null }
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
    setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION',
        data: null
      })
    }, timeout * 1000)
  }
}

export default notificationReducer