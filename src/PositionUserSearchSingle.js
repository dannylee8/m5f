import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { withRouter } from 'react-router-dom'

class PositionUserSearchSingle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myState: true
    }
  }

  onClickHandler = (singleRole, singlePosition, updatePositionsUser) => {
    updatePositionsUser(singlePosition.id, singleRole.user_id)
    this.props.history.push('/teams')
  }

  render () {
    const { singleRole, singlePosition, findUserByID, updatePositionsUser } = this.props;
    return (
      <tr>
        <td>{findUserByID(singleRole.user_id).name}</td>
        <td className='centered'>{singleRole.years_exp}</td>
        <td className='centered'>
          <Tooltip title='Add user'>
            <i onClick={() => this.onClickHandler(singleRole, singlePosition, updatePositionsUser)} className='material-icons-outlined'>add</i>
          </Tooltip>
        </td>
      </tr>
    )
  }
}

export default withRouter(PositionUserSearchSingle)

