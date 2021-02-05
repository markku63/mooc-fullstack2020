import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog, removeBlog } from '../reducers/blogsReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.loggedUser)
  const blog = blogs.find(b => b.id === id)
  const own = blog.user.username === user.username

  const handleLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    dispatch(updateBlog(updatedBlog))
  }

  const handleRemove = (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(removeBlog(blog.id))
    }
  }


  return (
    <div className='blog'>
      <h2>
        <i>{blog.title}</i> by {blog.author}
      </h2>

      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes} likes
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        {own&&<button onClick={() => handleRemove(blog)}>remove</button>}
      </div>

    </div>
  )
}

export default Blog