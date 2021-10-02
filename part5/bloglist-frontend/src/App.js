import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogNew from './components/BlogNew'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user , setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [newBlogObj, setNewBlogs] = useState()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  //HOOKS

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
      console.log("objnew ",newBlogObj)
    //blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(newBlogObj)
      setErrorMessage('new blog is plublished')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.concat(newBlog))
      
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'User', JSON.stringify(user)
      )

    setErrorMessage('successfull login')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    }catch(excepetion){
      setErrorMessage("wrong Username or Password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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









  ///

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

      <Notification message={errorMessage} />
      { user == null ? loginForm() :
      <div>
      
      <div>{user.username} logged in <button onClick={handleLogout}>logout</button></div>
      <BlogNew handleNewBlog={handleNewBlog}/>
        <ul> 
          {blogs.map((blog, i) => 
            <Blog blog={blog} key={i}/>
            )}
        </ul>
      </div>
      }
    </div>
      
  )
}

export default App