import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Form, Button } from 'react-bootstrap'
import { setNotification } from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogsReducer'

const NewBlog = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleNewBlog = (event) => {
    event.preventDefault()

    dispatch(newBlog({
      title, author, url
    }))
    dispatch(setNotification(
      { message: `a new blog '${title}' by ${author} added!`, type: 'success' },
      5
    ))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Container>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>create new blog</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <h2>create new</h2>
        <Form onSubmit={handleNewBlog}>
          <Form.Group controlId="formGroupAuthor">
            <Form.Label>author</Form.Label>
            <Form.Control type="text"
              id='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupTitle">
            <Form.Label>title</Form.Label>
            <Form.Control type="text"
              id='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupUrl">
            <Form.Label>url</Form.Label>
            <Form.Control type="text"
              id='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </Form.Group>
          <Button variant="success" type="submit" id="create">create</Button>
        </Form>
        <Button variant="danger" onClick={toggleVisibility}>cancel</Button>
      </div>
    </Container>
  )
}

export default NewBlog