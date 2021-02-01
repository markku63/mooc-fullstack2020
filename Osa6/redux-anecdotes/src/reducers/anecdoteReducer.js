import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const changedAnecdote = action.data
      const newState = state
        .map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
        .sort((a, b) => b.votes - a.votes)
      return newState
    case 'NEW':
      return state.concat(action.data)
    case 'INIT':
      return action.data.sort((a, b) => b.votes - a.votes)
    default:
      return state  
  }
}

export const addVote = (content) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVote(content)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer