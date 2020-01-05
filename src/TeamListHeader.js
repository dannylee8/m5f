import React from 'react'
import { withRouter } from 'react-router-dom'

const TeamListHeader = props => (
  <>
    <h3 className='fade-in'>
      <i
        className='material-icons'
        onClick={e => {
          props.goBackHandler()
          props.history.push('/teams') 
        }}
      >arrow_back</i>
      {props.state.teamSelected}
    </h3>
    <h6><span className='owner'>Team Owner:</span> {props.findTeamLeader(props.state.teamObject.id).name}</h6>
  </>
)

export default withRouter(TeamListHeader)
