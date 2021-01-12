import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, loggedUser, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenVisibleAndLogged = { display: visible && loggedUser === blog.user.username ? '' : 'none' }

  const handleVisibility = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const updatedBlog = {
      id: blog.id,
      user: blog.user,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }

    updateBlog(updatedBlog)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author}<button onClick={handleVisibility}>{visible?'hide':'view'}</button></div>
      <div className="optionalContent" style={showWhenVisible}><a href={blog.url}>{blog.url}</a></div>
      <div className="optionalContent" style={showWhenVisible}>likes {blog.likes} <button onClick={handleLike}>like</button></div>
      <div className="optionalContent" style={showWhenVisibleAndLogged}><button onClick={handleDelete}>remove</button></div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
