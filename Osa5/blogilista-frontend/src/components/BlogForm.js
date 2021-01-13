import React, { useState } from 'react'

const BlogForm = ({
  addBlog,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            value={title}
            name="Title"
            id="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            value={author}
            name="Author"
            id="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            type="text"
            value={url}
            name="Url"
            id="url"
            onChange={handleUrlChange}
          />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )}

export default BlogForm