import React from 'react'

const TeamListHeader = props => (
		<>
			<h3 className='fade-in'><i onClick={e => this.props.goBackHandler(e)} className="material-icons">arrow_back</i>{this.props.state.teamSelected}</h3>
			<h6><span className="owner">Team Owner:</span> {this.props.findTeamLeader(this.props.state.teamObject.id).name}</h6>
		</>
)

export default TeamListHeader
