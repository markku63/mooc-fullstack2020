import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.addVote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (!state.filter) {
    return {
      anecdotes: state.anecdotes
    }
  }
  return {
    anecdotes: state.anecdotes
      .filter(p => p.content
      .toLowerCase()
      .includes(state.filter.toLowerCase()))
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification,
}
const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList