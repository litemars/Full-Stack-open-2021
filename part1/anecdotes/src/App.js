import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const DisplayVote = props => <div>has {props.value} votes</div>
const Display = props => <h2>{props.value}</h2>
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [most, setMost] = useState(0)
  const [vote, setVote] = useState(Array(7).fill(0))
  const random_num = ()=>Math.floor(Math.random() * 7) 
  console.log(selected)
  const new_anecdote= ()=>setSelected(random_num())

  const voting = () =>{
    const copy = [...vote]
    copy[selected]++
    setVote(copy)
    let maxValue = copy.indexOf(Math.max(...copy));
    setMost(maxValue)
  } 

  return (
    <div>
      <Display value="Anecdote of the day"/>
      {anecdotes[selected]}
      <br/>
      
      <DisplayVote value={vote[selected]}/>
      <br/>
      <Button handleClick={voting} text='vote'/>
      <Button handleClick={new_anecdote} text='next anecdote'/>
      <Display value="Anecdote with most votes"/>
      {anecdotes[most]}

    </div>
  )
}

export default App
