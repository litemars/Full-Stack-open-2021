import React, { useState, useEffect,useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogNew from './components/BlogNew'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user , setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  //HOOKS


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('User')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // FUNCTIONS

  const handleNewBlog = async (newBlogObj) => {

    //blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(newBlogObj)
    setSuccessMessage('new blog is plublished')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    setBlogs(blogs.concat(newBlog))

  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials={
        username, password
      }
      const user = await loginService.login(credentials)
      console.log('username',user)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'User', JSON.stringify(user)
      )

      setSuccessMessage('successfull login')
      console.log('success',successMessage)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }catch(excepetion){
      setErrorMessage('wrong Username or Password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  //CHANGE
  const changeLikes = async (newObj) => {
    console.log('update like',newObj)
    await blogService.update(newObj)
    setBlogs(
      blogs.map((blog) => (blog.id === newObj.id ? newObj : blog))
    )
    setSuccessMessage('liked +1')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const deleteBlog = async (id) => {
    await blogService.del(id)
    setBlogs(blogs.filter((blog) => blog.id !== id))
    setSuccessMessage('blog deleted')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.clear()
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('not able to logout')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )


  return (
    <div>
      <h1>Blogs</h1>

      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      { user === null ? loginForm() :
        <div>

          <div>{user.username} logged in <button onClick={handleLogout}>logout</button></div>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogNew handleNewBlog={handleNewBlog}/>
          </Togglable>
          <ul>
            {blogs.sort((a, b) => (b.likes - a.likes))
              .map((blog, i) =>
                <Blog blog={blog} key={i} deleteBlog={deleteBlog} changeLikes={changeLikes}/>
              )}
          </ul>
        </div>
      }
    </div>

  )
}

export default App