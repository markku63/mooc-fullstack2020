import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { updateBlog, removeBlog, commentBlog } from '../reducers/blogsReducer'

const Blog = () => {
  const [comment, setComment] = useState('')
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

  const newComment = async (event) => {
    event.preventDefault()

    dispatch(commentBlog(id, comment))
    setComment('')
  }

  return (
    <Container>
      <h2>
        <i>{blog.title}</i> by {blog.author}
      </h2>

      <Container>
        <Row><a href={blog.url}>{blog.url}</a></Row>
        <Row>
          <Col xs="auto">{blog.likes} likes</Col>
          <Col><Button variant="success" onClick={() => handleLike(blog)}>like</Button></Col>
        </Row>
        <Row>added by {blog.user.name}</Row>
        {own&&<Button variant="danger" onClick={() => handleRemove(blog)}>remove</Button>}
      </Container>

      <h3>
        comments
      </h3>
      <Form inline onSubmit={newComment}>
        <Form.Group as={Row} controlId="BlogComment">
          <Col>
            <Form.Control type="text"
              xs="auto"
              className="mb-2 mr-sm-2"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </Col>
          <Col>
            <Button type="submit" className="mb-2">add comment</Button>
          </Col>
        </Form.Group>
      </Form>
      {blog.comments &&
      <ul>
        {blog.comments.map((comm, i) =>
          <li key={i}>{comm}</li>)}
      </ul>
      }
    </Container>
  )
}

export default Blog