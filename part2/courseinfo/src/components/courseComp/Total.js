import React from 'react'

const Total = ({key,parts}) =>{

    const sum=parts.reduce((partial_sum,a)=>{
        console.log("first " , partial_sum, "second ", a)
        return partial_sum+a.exercises},0 )

   console.log(parts)
    return(
        <>
        <h4 key={key}>Total of {sum} exercises</h4>
        </>
    )
}
export default Total