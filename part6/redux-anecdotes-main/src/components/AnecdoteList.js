import React from "react"
import { useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

    const fil=useSelector(state => state).filter
    const anecdotes = useSelector(state => state).anecdotes.sort((a, b) => b.votes - a.votes)
    .filter((an)=>{
        if(fil ==='')return an
        return an.content.match(fil)
    })

  const vote = (anacdote) => {
    props.voteAnecdote(anacdote)
    props.showNotification(`You voted '${anacdote.content}'`,5)
    setTimeout(() => {
        props.showNotification(null)
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
            has {anecdote.votes} vote/s
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
    )
}
export default connect(null, { voteAnecdote, showNotification })(AnecdoteList)