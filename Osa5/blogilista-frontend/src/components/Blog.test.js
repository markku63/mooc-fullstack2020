import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Blogging considered harmful',
    author: 'John Doe',
    url: 'http://example.com/',
    likes: 0,
    user: {
      username: 'nobody'
    }
  }

  test('renders title and author but not URL or likes', () => {
    const component = render(
      <Blog blog={blog} loggedUser='' deleteBlog={() => {}} updateBlog={() => {}} />
    )
    expect(component.container).toHaveTextContent('Blogging considered harmful')
    expect(component.container).toHaveTextContent('John Doe')
    const urlElement = component.container.querySelector('.blogUrl')
    expect(urlElement).toHaveTextContent('http://example.com/')
    expect(urlElement).toHaveStyle('display: none;')
    const likesElement = component.container.querySelector('.blogLikes')
    expect(likesElement).toHaveStyle('display: none;')
  })

  test('makes details visible when button is clicked', () => {
    const component = render(
      <Blog blog={blog} loggedUser='' deleteBlog={() => {}} updateBlog={() => {}} />
    )
    const button = component.getByText('view')
    fireEvent.click(button)
    const urlElement = component.container.querySelector('.blogUrl')
    const likesElement = component.container.querySelector('.blogLikes')
    expect(urlElement).not.toHaveStyle('display: none;')
    expect(likesElement).not.toHaveStyle('display: none;')
  })

  test('registers each press of like-button', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} loggedUser='' deleteBlog={() => {}} updateBlog={mockHandler} />
    )
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})