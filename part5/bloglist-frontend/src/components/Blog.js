import React from 'react'
import Togglable from './Togglable'



const Blog = ({ blog,changeLikes,deleteBlog }) => {

  const handleClick = async () => {
    const newBlog = { ...blog,
      likes: blog.likes+1
    }
    changeLikes(newBlog)
  }

  const handleRemove = async () => {
    window.confirm(`Delete ${blog.title} ${blog.author}?`) && deleteBlog(blog.id)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle}>
      <p >{blog.title} {blog.author}</p>
      <Togglable buttonLabel={'View'}>
        <p>{blog.url}</p>
        <p id='Likes'>{blog.likes}<button onClick={handleClick}>Like</button></p>
        <button id='remove' onClick={handleRemove}>remove</button>
      </Togglable>
    </div>
  )
}

export default Blog