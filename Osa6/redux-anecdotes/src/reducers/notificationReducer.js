const initialState = {
  text: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      const voteMessage = `you voted '${action.data.content}'`
      const voteState = { text: voteMessage }
      return voteState
    case 'NEW':
      const newMessage = `you added new anecdote '${action.data}'`
      const newState = { text: newMessage }
      return newState
    case 'RESET':
      const clearState = { text: null }
      return clearState
    default:
      return state
  }
}

export const notifyVote = (anecdote) => {
  return {
    type: 'VOTE',
    data: anecdote
  }
}

export const notifyNew = (anecdote) => {
  return {
    type: 'NEW',
    data: anecdote
  }
}

export const notifyReset = () => {
  return {
    type: 'RESET',
    data: null
  }
}

export default notificationReducer