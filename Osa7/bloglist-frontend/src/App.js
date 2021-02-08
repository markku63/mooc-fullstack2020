import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Navbar, Container, Form, Button, Nav, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

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
      <Container>
        <h2>login to application</h2>

        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formGroupUsername">
            <Form.Label>username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button variant="primary" type="submit">login</Button>
          </Form.Group>
        </Form>
      </Container>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <Container>
      <Router>
        <Notification />
        <Navbar bg="light">
          <LinkContainer to="/"><Nav.Link>blogs</Nav.Link></LinkContainer>
          <LinkContainer to="/users"><Nav.Link>users</Nav.Link></LinkContainer>
          <Navbar.Text className="px-3">
            {user.name} logged in
          </Navbar.Text>
          <Button variant="outline-primary" onClick={handleLogout}>
            logout
          </Button>
        </Navbar>
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
            <ListGroup>
              {blogs.sort(byLikes).map(blog =>
                <ListGroup.Item key={blog.id} >
                  <Link to={`/blogs/${blog.id}`}><i>{blog.title}</i> by {blog.author}</Link>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App