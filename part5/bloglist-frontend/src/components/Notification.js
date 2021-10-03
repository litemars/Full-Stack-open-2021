import React from 'react'


const Notification = ({ errorMessage, successMessage }) => {

  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    bordeRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  //WHY?
  //if(successMessage===undefined)successMessage=null
  console.log('message',successMessage)
  if (successMessage === null && errorMessage === null) {
    return(
      <div></div>
    )
  } else if (successMessage){
    return (
      <div id='success' style={success}>
        {successMessage}
      </div>
    )
  } else {
    return (
      <div id='error' style={error}>
        {errorMessage}
      </div>
    )
  }
}

export default Notification