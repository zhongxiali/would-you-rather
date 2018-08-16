import { RECEIVE_USERS, ADD_USER_ANSWER, ADD_USER_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case ADD_USER_ANSWER:
      const { authedUser,qid,answer } = action
      return{
        ...state,
        [authedUser]:{
          ...state[authedUser],
          answers:{
            ...state[authedUser].answers,
            [qid]:answer,
          }
        }
      }
     case ADD_USER_QUESTION:
      const {question, authedUserid} = action
      console.log(action);
      return{
        ...state,
        [authedUserid]:{
          ...state[authedUserid],
          questions:state[authedUserid].questions.concat([question.id])
        }
      }
    default:
      return state
  }
}
