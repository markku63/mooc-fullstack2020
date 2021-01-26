const initialState = {
  text: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE_NOTIFICATION':
      const voteMessage = `you voted '${action.data.content}'`
      const voteState = { text: voteMessage }
      return voteState
    case 'NEW_NOTIFICATION':
      const newMessage = `you added new anecdote '${action.data}'`
      const newState = { text: newMessage }
      return newState
    case 'RESET_NOTIFICATION':
      const clearState = { text: null }
      return clearState
    default:
      return state
  }
}

export const notifyVote = (anecdote) => {
  return {
    type: 'VOTE_NOTIFICATION',
    data: anecdote
  }
}

export const notifyNew = (anecdote) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: anecdote
  }
}

export const notifyReset = () => {
  return {
    type: 'RESET_NOTIFICATION',
    data: null
  }
}

export default notificationReducer