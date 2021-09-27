import React from 'react'
const Notification = ({ message }) => {
    
    
    const green = message.match('removed') || message.match('failed')?{ 
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        padding: '10px',
        marginBottom: '10px'
        }:{
            color: 'green',
            background: 'lightgrey',
            fontSize: '20px',
            borderStyle: 'solid',
            padding: '10px',
            marginBottom: '10px'
          }



    if (message === null) {
      return null
    }

    return (
        <div style={green} className="error">
          {message}
        </div>
    )
  }
  export default Notification