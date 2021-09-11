import React from 'react'
import Header from './courseComp/Header'
import Content from './courseComp/Content'
import Total from './courseComp/Total'

const Course =({ course}) =>{
    return(
    <>
    <Header name={course.name}/>
    <Content  parts={course.parts}/>
    <Total  parts={course.parts}/>
    </>
    )
}
export default Course