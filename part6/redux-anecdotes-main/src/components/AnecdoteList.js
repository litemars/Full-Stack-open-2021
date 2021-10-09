import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
const fil=useSelector(state => state).filter
const anecdotes = useSelector(state => state).anecdotes.sort((a, b) => b.votes - a.votes)
.filter((an)=>{
    if(fil==="")return an
    return an.content.match(fil)
})
const dispatch = useDispatch()

  const vote = (anacdote) => {
    console.log('vote', anacdote.id)
    dispatch(voteAnecdote(anacdote.id))
    dispatch(showNotification(`You voted '${anacdote.content}'`))
    setTimeout(() => {
      dispatch(showNotification(null))
    }, 5000)
  }

return(  
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
    )
}
export default AnecdoteList