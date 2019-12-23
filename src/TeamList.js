import React from 'react'

const TeamList = props => (
  <>
    <h3>Your Teams:</h3>
    <ol>
      {props.findUserTeams(props.state.current_user.id).map(team => (<li key={team.id}>{team.name}</li>))}
    </ol>
  </>
)

export default TeamList
