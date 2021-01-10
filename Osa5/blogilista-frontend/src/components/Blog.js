import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleVisibility = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title}<button onClick={handleVisibility}>{visible?'hide':'view'}</button></div>
      <div style={showWhenVisible}><a href={blog.url}>{blog.url}</a></div>
      <div style={showWhenVisible}>likes {blog.likes} <button>like</button></div>
      <div style={showWhenVisible}>{blog.author}</div>
    </div>
  )}

export default Blog
