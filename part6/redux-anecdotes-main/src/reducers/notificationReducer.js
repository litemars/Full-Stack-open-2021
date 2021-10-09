const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SHOW': {
        return action.data.notification
      }
      default:
        return state
    }
  }

  export const showNotification = (notification) => {
    return {
      type: 'SHOW',
      data: {
        notification,
      },
    }
  }

  export default notificationReducer 