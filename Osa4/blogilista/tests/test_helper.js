const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '5fe05eba8803965875fcfc1d',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '5fe05eba8803965875fcfc1d',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '5fe05eba8803965875fcfc1d',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '5fe05fda9fa81e5b1a5bb86f',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '5fe05fda9fa81e5b1a5bb86f',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '5fe05fda9fa81e5b1a5bb86f',
    __v: 0
  }
]

const initialUsers = [
  {
    _id: '5fe05eba8803965875fcfc1d',
    username: 'hellas',
    name: 'Arto Hellas',
    passwordHash: '$2b$10$TgsXdPNBpgWWyLtyKe5dmOZhPe.yPzilAc/o2h8i6Fo4DY4/euyE6',
    blogs: [],
    __v: 0
  },
  {
    _id: '5fe05fda9fa81e5b1a5bb86f',
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    passwordHash: '$2b$10$J6kWdONXesn9qXfl8zUZi.5wdlEgggnqg7NR1rk.e2hVsW0zneGkW',
    blogs: [],
    __v: 0
  }
]
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb
}