import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'

test('renders content', () => {
  const blog = {
    url: 'massimo.com',
    title: 'Max',
    author: 'Me',
    likes : 1
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    blog.url
  )
  expect(component.container).toHaveTextContent(
    blog.likes
  )
})


test('like button', () => {
  const blog = {
    title: 'example.com',
    author: 'Max',
    url: 'example.com',
    likes: 4
  }

  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} changeLikes={mockHandler} />)

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
});

test('like button', () => {
  let blog = {
    title: 'example.com',
    author: 'Max',
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    blog.title
  )
  expect(component.container).toHaveTextContent(
    blog.author
  )
});