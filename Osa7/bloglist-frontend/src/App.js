import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'

import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loadUser, loginUser, logoutUser } from './reducers/loggedUserReducer'


const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.loggedUser)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(loadUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const padding = { padding: 5 }

  return (
    <Router>
      <Notification />
      <div style={{ backgroundColor: 'LightGrey' }}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blog app</h2>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <NewBlog />
          {blogs.sort(byLikes).map(blog =>
            <div key={blog.id} style={blogStyle} className='blog'>
              <Link to={`/blogs/${blog.id}`}><i>{blog.title}</i> by {blog.author}</Link>
            </div>
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default App