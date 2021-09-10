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
  console.log(props)
  return(
    <div>
    <Part cont={props.cont[0].name} num={props.cont[0].exercises}></Part>
    <Part cont={props.cont[1].name} num={props.cont[1].exercises}></Part>
    <Part cont={props.cont[2].name} num={props.cont[2].exercises}></Part>
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content cont={course.parts} />
      <Total num={course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises} />
    </>
  )
}

export default App