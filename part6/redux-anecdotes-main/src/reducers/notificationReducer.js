var timeId = 0
const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SHOW': {
        return action.data
      }
      case 'HIDE': {
        return null
      }
      default:
        return state
    }
  }

  export const showNotification = (notification, time) => {
    return async(dispatch)=>{
      console.log("cleaning timeout",timeId)
      clearTimeout(timeId)
      timeId = setTimeout(() => 
        dispatch({ type:"HIDE" })
      , time*1000)
      console.log("timeid",timeId)
    
      dispatch({
        type: "SHOW",
        data: notification,
      })
    }

  }

  export default notificationReducer 