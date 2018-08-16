import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class QuestionPreview extends Component {
  toQuestion = (e,id)=>{
    e.preventDefault()
    this.props.history.push(`/question/${id}`)

  }
  render(){
    const { author,question,id } = this.props
    return(
      <div className='cardcontainer'>
        <div className='cardtitle'>
          {author.name} asks:
        </div>
        <div className='cardcontent'>
          <img src={author.avatarURL} alt=''></img>
          <div className='verticalline'></div>
          <div className='questionbox'>
            <h3>Would you rather...</h3>
            <p>...{question.optionOne.text}...</p>
            <button className='btnpoll' onClick={(e)=>this.toQuestion(e, id)} >
              View Poll
            </button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({users, questions},{id}) {
  const question = questions[id]
  return {
    author:users[question.author],
    question,
    id
  }
}

export default withRouter(connect(mapStateToProps)(QuestionPreview))
