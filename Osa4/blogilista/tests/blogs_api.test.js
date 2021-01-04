const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

// token for user 'mluukkai', update the token if environment variable SECRET changes
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI1ZmUwNWZkYTlmYTgxZTViMWE1YmI4NmYiLCJpYXQiOjE2MDk3NjU4MzF9.ZEdQ0ik4PKhTYDZlk8Vg5HzB7t0tN4qFlQob-LALU8A'

beforeEach(async () => {
  await Blog.deleteMany()
  await User.deleteMany()
  await User.insertMany(helper.initialUsers)
  await Blog.insertMany(helper.initialBlogs)
})

describe('When there are some initial users and blogs', () => {
  test('all blogs are returned and they are in JSON', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('blogs have an id field', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  test('a blog can be added', async () => {
    const newBlog = {
      title: 'A test blog',
      author: 'Abe Test',
      url: 'http://www.example.com/testing',
      likes: 42
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    const authors = blogsAtEnd.map(n => n.author)
    expect(titles).toContain('A test blog')
    expect(authors).toContain('Abe Test')
  })

  test('likes defaults to zero', async () => {
    const newBlog = {
      title: 'A test blog',
      author: 'Abe Test',
      url: 'http://www.example.com/testing'
    }

    const response = await api
      .post('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('blog title and URL are required', async () => {
    const badBlog = {
      author: 'John Doe'
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: 'bearer ' + token })
      .send(badBlog)
      .expect(400)
  })

  test('deletion of an existing note', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart.find(e => e.id === '5a422bc61b54a676234d17fc')

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: 'bearer ' + token })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('changing the likes of an existing note', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]
    const likes = { likes: blogToModify.likes + 1 }

    const result = await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(likes)
      .expect(200)

    expect(result.body.likes).toBe(blogToModify.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})