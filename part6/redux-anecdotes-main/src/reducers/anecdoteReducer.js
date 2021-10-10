import service from "../services/service"

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action.data)

  switch(action.type){
    case 'Vote':{
      state = state.map((an)=>an.id===action.data?
      {...an, votes: an.votes+1}: an 
      )
      return state
    }
    case 'New':{
      return [...state, action.data]
    }
    case 'Init':
      return action.data
    default: return state
  }
}

export const voteAnecdote = (an)=>{
  return async (dispatch) => {
    await service.voteUp({ ...an, votes: an.votes + 1 })
    dispatch({
      type: 'Vote',
      data: an.id,
    })
  }
}

export const newAnecdote = (anecdote) => {
  return async (dispatch) => {
    anecdote = await service.createNew(anecdote)
    dispatch({
      type: 'New',
      data: anecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  console.log("INIT")
  return async (dispatch) => {
    const anecdotes = await service.getAll()
    dispatch({
      type: 'Init',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer