import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogsReducer'

const NewBlog = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleNewBlog = (event) => {
    event.preventDefault()

    dispatch(newBlog({
      title, author, url
    }))
    dispatch(setNotification(
      { message: `a new blog '${title}' by ${author} added!`, type: 'success' },
      5
    ))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>create new blog</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
          <div>
          author
            <input
              id='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
          title
            <input
              id='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
          url
            <input
              id='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button id="create">create</button>
        </form>
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default NewBlog