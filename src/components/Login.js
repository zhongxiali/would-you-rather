import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    select: ''
  }

  handleChange = (e) => {
    const select = e.target.value
    this.setState(() => ({
      select
    }))
  }

  handleLogin = (e) => {
    e.preventDefault()
    const { select } = this.state
    this.props.dispatch(setAuthedUser(select))
    this.props.history.push('/')
  }

  render() {
    const { users } = this.props
    const { select } = this.state
    return (
      <div>
        <div className="cardcontainer">
          <div className="cardtitle">Welcome</div>
          <div className="cardcontent">
            <h3 className="center">Sign in</h3>
            <select
              className="selectlogin"
              autoFocus
              onChange={this.handleChange}
              defaultValue=""
            >
              <option value="" disabled>
                Sign in as:
              </option>
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
            <button
              className="btnlogin"
              onClick={this.handleLogin}
              disabled={select === ''}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users)
  }
}

export default connect(mapStateToProps)(Login)
