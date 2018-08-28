import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import NavBar from './NavBar'
import LogStatus from './LogStatus'
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import QuestionList from './QuestionList'
import QuestionCard from './QuestionCard'
import Login from './Login'
import Error from './Error'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <h2 className="center">Would you rather</h2>
          <div className="menubar">
            <NavBar />
            <LogStatus />
          </div>
          {this.props.loading === true ? null : this.props.authedUser === '' ? (
            <div>
              <Route component={Login} />
            </div>
          ) : (
            <div>
              <Route path="/" exact component={QuestionList} />
              <Route path="/login" component={Login} />
              <Route path="/error" component={Error} />
              <Route path="/questios/:id" component={QuestionCard} />
              <Route path="/add" component={NewQuestion} />
              <Route path="/leaderboard" component={LeaderBoard} />
            </div>
          )}
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)
