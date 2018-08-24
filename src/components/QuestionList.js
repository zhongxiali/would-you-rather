import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPreview from './QuestionPreview'
import { withRouter } from 'react-router-dom'

class QuestionList extends Component {
  componentWillMount() {
    if (this.props.authedUser == '') {
      this.props.history.push('/login')
    }
  }
  state = {
    answeredlist: false
  }
  switchList = () => {
    this.setState(() => ({
      answeredlist: !this.state.answeredlist
    }))
  }
  render() {
    const { answered, unanswered, authedUser } = this.props
    return (
      <div className="container1">
        <button
          className="switchbtn"
          disabled={!this.state.answeredlist}
          onClick={this.switchList}
        >
          Unanswered
        </button>
        <button
          className="switchbtn"
          disabled={this.state.answeredlist}
          onClick={this.switchList}
        >
          Answered
        </button>
        <ul className="dashboard-list">
          {this.state.answeredlist
            ? answered.map((id) => (
                <li key={id}>
                  <QuestionPreview id={id} />
                </li>
              ))
            : unanswered.map((id) => (
                <li key={id}>
                  <QuestionPreview id={id} />
                </li>
              ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser }) {
  return {
    answered: Object.keys(questions)
      .filter(
        (a) =>
          questions[a].optionOne.votes.includes(authedUser) ||
          questions[a].optionTwo.votes.includes(authedUser)
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    unanswered: Object.keys(questions)
      .filter(
        (a) =>
          !questions[a].optionOne.votes.includes(authedUser) &&
          !questions[a].optionTwo.votes.includes(authedUser)
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(QuestionList))
