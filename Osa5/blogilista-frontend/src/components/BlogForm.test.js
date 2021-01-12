import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls event handler with right details', () => {
    const createBlog = jest.fn()
    const component = render(
      <BlogForm addBlog={createBlog} />
    )
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, { target: { value: 'Edsger W. Dijkstra' } })
    fireEvent.change(title, { target: { value: 'Go To Statement Considered Harmful' } })
    fireEvent.change(url, { target: { value: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html' } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('Edsger W. Dijkstra')
    expect(createBlog.mock.calls[0][0].title).toBe('Go To Statement Considered Harmful')
    expect(createBlog.mock.calls[0][0].url).toBe('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
  })
})