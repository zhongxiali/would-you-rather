import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserStats extends Component {
  render(){
    const {user}= this.props
    return(
      <div className='cardcontainer'>
        <img src={user.avatarURL} alt=''></img>
        <div className='verticalline'></div>
        <div className='statsContainer'>
          <h3>{user.name}</h3>
          <div>
            Answered questions
            <div className='score'>{Object.keys(user.answers).length}</div>
          </div>
          <hr/>
          <div>
            Created questions
            <div className='score'>{user.questions.length}</div>
          </div>
        </div>
        <div className='verticalline'></div>
        <div className='scorebox'>
          <div className='scoretitle'>Score</div>
          <div className='scorenumber'>{Object.keys(user.answers).length+user.questions.length}</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({users},{id}) {
  const user = users[id]
  return {
    user
  }
}

export default connect(mapStateToProps)(UserStats)
