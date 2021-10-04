import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogNew'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm handleNewBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#titleIn')
  const authorInput = component.container.querySelector('#authorIn')
  const urlInput = component.container.querySelector('#urlIn')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'Coool' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'Marcus' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'http://cooooolll.com' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Coool')
  expect(createBlog.mock.calls[0][0].author).toBe('Marcus')
  expect(createBlog.mock.calls[0][0].url).toBe('http://cooooolll.com')
})