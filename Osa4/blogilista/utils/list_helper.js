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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}