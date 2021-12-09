import React, { useState, useEffect,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogNew from './components/BlogNew'
import Blog from './components/Blog'
import { setNotification } from './reducers/notificationReducer'
import { addNewBlog, deleteBlog, initBlogs, likeBlog } from './reducers/blogReducer'
import { logIn, logOut, setExistingUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()


  useEffect(() => {
    dispatch(setExistingUser())
  }, [dispatch])
  //HOOKS


  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  // FUNCTIONS

  const handleNewBlog = async (newBlogObj) => {

    blogFormRef.current.toggleVisibility()
    dispatch(addNewBlog(newBlogObj))
    dispatch(setNotification(`A new blog '${newBlogObj.title}' by ${newBlogObj.author} added`, 5))
    dispatch(initBlogs())
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logIn(username, password))
    setUsername('')
    setPassword('')
  }


  const changeLikes = async (newObj) => {
    dispatch(likeBlog(newObj))
    dispatch(setNotification(`Liked blog '${newObj.title}' by ${newObj.author}`, 5))
    dispatch(initBlogs())
  }

  const delBlog = async (id) => {
    dispatch(deleteBlog(id))
    dispatch(setNotification('Blog removed', 5))
    dispatch(initBlogs())
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logOut())
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginButton" type="submit">login</button>
    </form>
  )


  return (
    <div>
      <h1>Blogs</h1>

      <Notification/>
      { user === null ? loginForm() :
        <div>

          <div>{user.username} logged in <button onClick={handleLogout}>logout</button></div>

          <Togglable buttonLabel="new blog" buttonLabel1="cancel" ref={blogFormRef}>
            <BlogNew handleNewBlog={handleNewBlog}/>
          </Togglable>
          <ul>
            {blogs.sort((a, b) => (b.likes - a.likes))
              .map((blog, i) =>
                <Blog blog={blog} key={i} deleteBlog={delBlog} changeLikes={changeLikes}/>
              )}
          </ul>
        </div>
      }
    </div>

  )
}

export default App