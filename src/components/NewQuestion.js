import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion} from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class NewQuestion extends Component {
  componentWillMount(){
    if(this.props.authedUser==''){
      this.props.history.push('/login')
    }
  }
  state = {
    text1: '',
    text2: '',
    toHome:false
  }
  handleChange1 = (e)=>{
    const text1 = e.target.value
    this.setState(()=>({
      text1
    }))
  }
  handleChange2 = (e)=>{
    const text2 = e.target.value
    this.setState(()=>({
      text2
    }))
  }
  handleSubmit =(e)=>{
    e.preventDefault()
    const {text1, text2} = this.state
    const { dispatch, id }= this.props

    dispatch(handleAddQuestion(text1, text2))

    this.setState(()=>({
      text1: '',
      text2: '',
      toHome:id?false:true,
    }))
  }

  render(){
    const {text1, text2, toHome}=this.state

    if(toHome === true){
      return <Redirect to='/' />
    }
    return(
      <div className='cardcontainer' >
        <div className='cardtitle'>
          Create New Question
        </div>
        <div className='cardcontent2'>
          <p>Complete the question:</p>
          <h3>Would you rather...</h3>
          <form className='' onSubmit={this.handleSubmit}>
            <textarea
              placeholder="Enter option one text here"
              value={text1}
              onChange={this.handleChange1}
              className='textarea'
              maxLength={280}
              rows="1"
            />
            <h4>- OR -</h4>
            <textarea
              placeholder="Enter option two text here"
              value={text2}
              onChange={this.handleChange2}
              className='textarea'
              maxLength={280}
              rows="1"
            />
            <button
              className='btnnew'
              type='submit'
              disabled={text1 === ''||text2 === ''}>
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser}) {
  return {
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))
