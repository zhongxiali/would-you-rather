import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/questions'
import { Line } from 'rc-progress'
import { withRouter } from 'react-router-dom'

class QuestionCard extends Component {
  componentWillMount() {
    if (this.props.author === null) {
      this.props.history.push('/error')
    }
  }
  state = {
    choice: '',
    toHome: false
  }
  handleChange = (e) => {
    const choice = e.target.value
    this.setState(() => ({
      choice
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { choice } = this.state
    const { authedUser, dispatch, id } = this.props

    dispatch(handleSaveAnswer(authedUser, id, choice))

    this.setState(() => ({
      text: '',
      toHome: id ? false : true
    }))
  }
  render() {
    const {
      author,
      question,
      id,
      authedUser,
      hasAnswered,
      countOne,
      countTwo
    } = this.props
    const { choice, toHome } = this.state
    if (author === null) {
      return <p>this tweet doesnt exist</p>
    }
    return (
      <div>
        <div className="cardcontainer">
          <div className="cardtitle">{author.name} asks:</div>
          <div className="cardcontent">
            <img src={author.avatarURL} alt="" />
            <div className="verticalline" />
            {hasAnswered ? (
              <div className="questionbox">
                <h3>Results:</h3>
                <div
                  className={
                    question.optionOne.votes.includes(authedUser)
                      ? 'resultboxSelect'
                      : 'resultbox'
                  }
                >
                  <h4>{question.optionOne.text}</h4>
                  {question.optionOne.votes.includes(authedUser) ? (
                    <img
                      src="https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787_960_720.png"
                      alt=""
                    />
                  ) : (
                    ''
                  )}
                  <Line
                    percent={(countOne / (countOne + countTwo)) * 100}
                    strokeWidth="6"
                    strokeColor="#357edd"
                    trailWidth="6"
                  />
                  <h5>
                    {countOne} out of {countOne + countTwo} votes
                  </h5>
                </div>
                <div
                  className={
                    question.optionTwo.votes.includes(authedUser)
                      ? 'resultboxSelect'
                      : 'resultbox'
                  }
                >
                  <h4>{question.optionTwo.text}</h4>
                  {question.optionTwo.votes.includes(authedUser) ? (
                    <img
                      src="https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787_960_720.png"
                      alt=""
                    />
                  ) : (
                    ''
                  )}
                  <Line
                    percent={(countTwo / (countOne + countTwo)) * 100}
                    strokeWidth="6"
                    strokeColor="#00C642"
                    trailWidth="6"
                  />
                  <h5>
                    {countTwo} out of {countOne + countTwo} votes
                  </h5>
                </div>
              </div>
            ) : (
              <div className="questionbox">
                <h3>Would you rather...</h3>
                <form className="new-answer" onSubmit={this.handleSubmit}>
                  <input
                    type="radio"
                    value="optionOne"
                    checked={choice === 'optionOne'}
                    onChange={this.handleChange}
                  />
                  <label>{question.optionOne.text}</label>
                  <br />
                  <input
                    type="radio"
                    value="optionTwo"
                    checked={choice === 'optionTwo'}
                    onChange={this.handleChange}
                  />
                  <label>{question.optionTwo.text}</label>
                  <button
                    className="btnpoll"
                    type="submit"
                    disabled={choice === ''}
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users, questions, authedUser }, props) {
  const { id } = props.match.params
  const question = questions[id]
  return {
    author: question ? users[question.author] : null,
    question,
    id,
    authedUser,
    countOne: question ? question.optionOne.votes.length : null,
    countTwo: question ? question.optionTwo.votes.length : null,
    hasAnswered: question
      ? question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(QuestionCard))
