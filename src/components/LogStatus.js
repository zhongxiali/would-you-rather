import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import { withRouter } from 'react-router-dom'

class LogStatus extends Component {
  handleLogout =(e)=>{
    e.preventDefault()
    const {dispatch}= this.props
    dispatch(setAuthedUser(''))
    this.props.history.push('/login')
  }
  render(){
    const { authedUser } = this.props
    return (
      <div className='right'>
        {authedUser
          ?(<Fragment>
            <button className='btn right' onClick={this.handleLogout}>logout</button>
            <div className='right'>
              <div className='login'>
                Hello,{authedUser.name}
              </div>
              <img
                className='smallAvatar'
                alt=''
                src={authedUser.avatarURL}
              />
            </div>
          </Fragment>
        )
          : null
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser:users[authedUser]
  }
}

export default withRouter(connect(mapStateToProps)(LogStatus))
