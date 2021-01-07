import React from 'react'

const BlogForm = ({
  addBlog,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
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
        <button type="submit">create</button>
      </form>
    </div>
  )}

export default BlogForm