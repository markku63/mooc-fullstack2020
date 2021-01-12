import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Blogging considered harmful',
      author: 'John Doe',
      url: 'http://example.com/',
      likes: 0,
      user: {
        username: 'nobody'
      }
    }

    component = render(
      <Blog blog={blog} loggedUser='' deleteBlog={() => {}} updateBlog={() => {}} />
    )
  })

  test('renders title and author but not URL', () => {
    expect(component.container).toHaveTextContent('Blogging considered harmful')
    expect(component.container).toHaveTextContent('John Doe')
    const urlElement = component.container.querySelector('.optionalContent')
    expect(urlElement).toHaveTextContent('http://example.com/')
    expect(urlElement).toHaveStyle('display: none;')
  })

  test('makes details visible when button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.optionalContent')
    expect(div).not.toHaveStyle('display: none;')
  })

  test('registers each press of like-button', () => {

  })
})