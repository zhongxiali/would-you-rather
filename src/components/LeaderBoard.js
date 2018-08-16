import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserStats from './UserStats'

class LeaderBoard extends Component {
  render(){
    const {users}=this.props
    return(
      <div className='container1'>
        <ul className='dashboard-list'>
          {users.map((id)=>(
            <li key={id}>
              <UserStats id={id}/>
            </li>
          ))
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users:Object.keys(users)
      .sort((a,b)=> (Object.keys(users[b].answers).length+users[b].questions.length)-
                      (Object.keys(users[a].answers).length+users[a].questions.length))
  }

}

export default connect(mapStateToProps)(LeaderBoard)
