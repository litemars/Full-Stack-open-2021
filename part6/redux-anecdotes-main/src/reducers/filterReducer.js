const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'filter': {
        return action.data.filter
      }
      default:
        return state
    }
  }

  export const setFilter = (filter) => {
    return {
      type: 'filter',
      data: {
        filter,
      },
    }
  }

  export default filterReducer