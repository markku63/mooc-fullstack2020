const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(helper.initialBlogs)
})

test('all notes are returned and they are in JSON', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('notes have an id field', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a blog can be added', async () => {
  const newBlog = {
    title: 'A test blog',
    author: 'Abe Test',
    url: 'http://www.example.com/testing'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain('A test blog')
})

test('likes defaults to zero', async () => {
  const newBlog = {
    title: 'A test blog',
    author: 'Abe Test',
    url: 'http://www.example.com/testing'
  }

  const response = await api
    .post('/api/blogs')
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
    .send(badBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})