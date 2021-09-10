import React from 'react'


const Header = (props) =>{
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Part = (props) =>{
  return (
    <div>
      <p>{props.cont}: {props.num}</p>
    </div>
  )
}

const Content = (props)=>{
  return(
    <div>
    <Part cont={props.cont[0]} num={props.cont[1]}></Part>
    <Part cont={props.cont[2]} num={props.cont[3]}></Part>
    <Part cont={props.cont[4]} num={props.cont[5]}></Part>
  </div>
  )
}

const Total = (props) =>{
  return (
    <div>
      <p>Number of exercises {props.num} </p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const content = [
    part1, exercises1,
    part2, exercises2,
    part3, exercises3
  ];
  return (
    <>
      <Header course={course} />
      <Content cont={content} />
      <Total num={exercises1+exercises2+exercises3} />
    </>
  )
}

export default App