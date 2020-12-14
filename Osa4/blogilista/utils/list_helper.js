const countBy = require('lodash/countBy')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0
  } else {
    return blogs
      .map(blog => blog.likes)
      .reduce((acc, cur) => acc + cur)
  }
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  } else {
    const favorite = blogs.sort((a, b) => b.likes - a.likes)[0]
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  } else {
    const countedBlogs = Object.entries(countBy(blogs, 'author')).sort((a, b) => b[1] - a[1])
    return {
      author: countedBlogs[0][0],
      blogs: countedBlogs[0][1]
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}