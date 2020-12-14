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

module.exports = {
  dummy,
  totalLikes
}