import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addUserAnswer, addUserQuestion } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())

    return _saveQuestion({
      author: authedUser,
      optionOneText: optionOne,
      optionTwoText: optionTwo
    })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(addUserQuestion({ question, authedUser }))
      })
      .then(() => dispatch(hideLoading()))
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

function saveAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function handleSaveAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(showLoading())

    _saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => dispatch(saveAnswer({ authedUser, qid, answer })))
      .then(() => dispatch(addUserAnswer({ authedUser, qid, answer })))
      .then(() => dispatch(hideLoading()))
  }
}
