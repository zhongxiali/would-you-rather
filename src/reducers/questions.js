import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_ANSWER } from '../actions/questions'

export default function questions (state={}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case SAVE_ANSWER:
      const { authedUser,qid,answer } = action
      return {
        ...state,
        [qid]:{
          ...state[qid],
          [answer]:{
            ...state[qid][answer],
            votes:state[qid][answer].votes.concat([authedUser])
          }
        }
      }
    case ADD_QUESTION:
      const{ question } = action
      console.log(question);
      return{
        ...state,
        [question.id]:question
      }
    default:
      return state
  }
}