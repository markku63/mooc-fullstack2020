import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

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

  const handleLike = async (event) => {
    event.preventDefault()
    const updatedBlog = {
      id: blog.id,
      user: blog.user,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: likes + 1
    }

    const returnedBlog = await blogService.update(updatedBlog)
    setLikes(returnedBlog.likes)
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title}<button onClick={handleVisibility}>{visible?'hide':'view'}</button></div>
      <div style={showWhenVisible}><a href={blog.url}>{blog.url}</a></div>
      <div style={showWhenVisible}>likes {likes} <button onClick={handleLike}>like</button></div>
      <div style={showWhenVisible}>{blog.author}</div>
    </div>
  )}

export default Blog
