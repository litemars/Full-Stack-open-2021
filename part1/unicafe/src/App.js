import React, { useState } from 'react'

const Button = ({text, handleClick}) => {
  return (
  <button onClick={handleClick}>{text}</button> 
  )
}

const StatisticLine = ({text, value})=>{
  return(
    <tr><th>{text}</th><th> {value}</th></tr>
  )
}

const Statistic = ({values}) =>{
  const [good,neutral,bad] = values
  const all=()=>good+neutral+bad
  const average=()=>(good+(bad*(-1)))/all()
  const positive = ()=>good/all()*100+'%'
  if(all()===0){
    return(
      <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }else{
    return(
      <>
      <h1>Statistics</h1>
      <table>
      <StatisticLine text="Good" value={good}/>
      <StatisticLine text="Neutral" value={neutral}/>
      <StatisticLine text="Bad" value={bad}/>
      <StatisticLine text="All" value={all()}/>
      <StatisticLine text="average" value={average()}/>
      <StatisticLine text="Positive" value={positive()}/>
      </table>
      </>
      
      )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const arr = [good,neutral,bad]
  return (
    <div>
      <h1>Give feedbacks</h1>
      <Button text="Good" handleClick={() => setGood(good+1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral+1)} />
      <Button text="Bad" handleClick={() => setBad(bad+1)} />

      <Statistic values={arr}/>

    </div>
  )
}

export default App