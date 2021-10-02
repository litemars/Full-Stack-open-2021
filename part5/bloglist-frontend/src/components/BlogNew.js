import React, {useState} from 'react'

const BlogNew = ({handleNewBlog}) => {

    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')


    const createBlog = (event) => {
        event.preventDefault()
        if(blogTitle===' '){
            setBlogTitle('No title')
        }
        if(blogAuthor===' '){
            setBlogAuthor('No Author')
        }
        if(blogUrl===' '){
            setBlogTitle('No url')
        }
       
        var newBlogObj={
          title: blogTitle,
          author: blogAuthor,
          url: blogUrl,
        }
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        handleNewBlog(newBlogObj)
      }
    

    const handleTitle = (event) => {
        setBlogTitle(event.target.value)
      }
      const handleAuthor = (event) => {
        setBlogAuthor(event.target.value)
      }
      const handleUrl = (event) => {
        setBlogUrl(event.target.value)
      }
    


    return (
        <div>
        <h3>Create new</h3>
        <form onSubmit={createBlog}>
            <div>
            title: <input id="titleIn"  value={blogTitle} onChange={handleTitle} />
            </div>
            <div>
            author: <input id="authorIn" value={blogAuthor} onChange={handleAuthor} />
            </div>
            <div>
            url: <input id="urlIn" value={blogUrl} onChange={handleUrl} />
            </div>
            <button id="newBlogButton" type="submit">create</button>
        </form>
        </div>
    )
}
export default BlogNew