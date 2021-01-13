import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (type, text) => {
    setMessageType(type)
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
      setMessageType('')
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('error', 'wrong username or password')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes))
      showNotification('notification', `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (error) {
      showNotification('error', 'error while adding blog')
    }

  }

  const updateBlog = async (blogObject) => {
    try {
      let newBlogs = [...blogs]
      const returnedBlog = await blogService.update(blogObject)
      const loc = newBlogs.findIndex((element) => element.id === blogObject.id)
      newBlogs[loc] = returnedBlog
      setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
    } catch (error) {
      showNotification('error', 'error while updating blog')
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
        let newBlogs = [...blogs]
        await blogService.remove(blogObject)
        const loc = newBlogs.findIndex((element) => element.id === blogObject.id)
        newBlogs.splice(loc, 1)
        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
      }
    } catch (error) {
      showNotification('error', 'error while deleting blog')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new note' ref={blogFormRef}>
      <BlogForm
        addBlog={addBlog}
      />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} type={messageType} />
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} loggedUser={user.username} deleteBlog={deleteBlog} />
      )}

    </div>
  )
}

export default App