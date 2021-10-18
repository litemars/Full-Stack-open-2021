import React from 'react';

const App = () => {

interface HaaderProps{
    name:string;
}
const Header=({name}:HaaderProps):JSX.Element=>{
    return <h1>{name}</h1>
}
interface TotalProps{
  total:number;
}
const Part=({part}:{part:CoursePart}):JSX.Element=>{
  switch(part.type){
    case "normal":
      return (<div>
        <i>{part.description}</i>
      </div>)
    case "groupProject":
      return (
        <div>
        project exercises: {part.groupProjectCount}
        </div>
      )
    case "submission":
      return(
        <div>
        <i>{part.description}</i>
        <div>submit to {part.exerciseSubmissionLink}</div>
        </div>
      )
    case "special":
      return(
          <div>
          <i>{part.description}</i>
          <div>required skills:  {part.requirements.join(', ')}</div>
          </div>
      )

    default: return<div></div>
  }
}
const Total=({total}:TotalProps):JSX.Element=>{
  return<p>Number of exercises {total}</p>
}
interface ContentProps{
  course:Array<CoursePart>;
}
const style = {
  paddingTop:10,
  paddingBottom:10
};
const Content=({course}:ContentProps):JSX.Element=>{
  return(
      <>
      {course.map(c=>
            <div key={c.name+1} style={style}><b key={c.name}>{c.name} {c.exerciseCount}</b><Part part={c}/></div>
      )}
      </>
  )
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
    description?: string;
  }
interface CourseNormalPart extends CoursePartBase {
    type: "normal";
    
  }
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }
  
interface CourseSubmissionPart extends CoursePartBase {
    type: "submission";
    exerciseSubmissionLink: string;
  }
  interface CourseSpecial extends CoursePartBase {
    type: "special";
    requirements: Array<string>
  }
  
type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecial;
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content course={courseParts}/>
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;