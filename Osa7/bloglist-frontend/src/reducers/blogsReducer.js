import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'UPDATE_BLOG':
    return state.map(b => b.id === action.data.id ? action.data : b)
  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.data)
  case 'COMMENT_BLOG': {
    const id = action.data.id
    const comment = action.data.comment
    const blogToChange = state.find(b => b.id === id)
    const changedBlog = { ...blogToChange, comments: blogToChange.comments ? blogToChange.comments.concat(comment) : [comment] }
    return state.map(blog => blog.id !== id ? blog : changedBlog)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const newBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    console.log('commentBlog: id=', id, 'comment=', comment)
    await blogService.addComment(id, comment)
    dispatch({
      type: 'COMMENT_BLOG',
      data: { id, comment }
    })
  }
}

export default blogsReducer