import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const newState = state
        .map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
        .sort((a, b) => b.votes - a.votes)
      return newState
    case 'NEW':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return state  
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
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