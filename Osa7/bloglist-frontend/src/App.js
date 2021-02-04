import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Users from './components/Users'

import { initializeBlogs } from './reducers/blogsReducer'
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

  return (
    <Router>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <NewBlog />

          {blogs.sort(byLikes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              own={user.username===blog.user.username}
            />
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default App