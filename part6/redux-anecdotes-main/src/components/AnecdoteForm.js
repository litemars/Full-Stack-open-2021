import React from "react"
import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {


    const create = (event) =>{
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value=''
        props.newAnecdote(content)
        props.showNotification(`created '${content}'`,5)
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
export default connect(null, { newAnecdote, showNotification })(AnecdoteForm)