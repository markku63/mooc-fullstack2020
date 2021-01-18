const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!request.token) {
    return response.status(401).json({ error: 'missing token' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()

  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'missing token' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }
  const userid = decodedToken.id
  const blog = await Blog.findById(request.params.id)
  if ( !blog ) {
    return response.status(404).json({ error: 'no such blog' })
  }
  if ( blog.user.toString() !== userid.toString()) {
    return response.status(403).json({ error: 'invalid user' })
  }
  await blog.delete()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes
  }
  console.log('id:', request.params.id, 'blog:', blog)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if ( !updatedBlog ) {
    return response.status(404).json({ error: 'no such blog' })
  }
  await updatedBlog.populate('user', { username: 1, name: 1 }).execPopulate()
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter