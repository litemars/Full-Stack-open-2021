import React from "react"
import { useDispatch } from "react-redux"
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const dispatch = useDispatch()

    const create = (event) =>{
    event.preventDefault()
    const content = event.target.newAnecdote.value
    console.log("content", content)
    dispatch(newAnecdote(content))
    dispatch(showNotification(`created '${content}'`))
    setTimeout(() => {
      dispatch(showNotification(null))
    }, 5000)
  }


return(  
    <>
    <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="newAnecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
    )
}
export default AnecdoteForm