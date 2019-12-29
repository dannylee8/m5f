import React from 'react'
import PositionRowIndex from './PositionRowIndex'
import PositionRowName from './PositionRowName'
import PositionRowPositionName from './PositionRowPositionName'
import PositionRowNameMissing from './PositionRowNameMissing'

const PositionRow = props => (
  <tr className={ (props.state.current_user.id === props.singlePosition.user_id) ?  'self-position'        :
                  (props.findUserByID(props.singlePosition.user_id))             ?   null                  :
                                                                                    'position-not-filled'} 
    >
    <PositionRowIndex idx={props.idx}/>
    <PositionRowPositionName singlePosition={props.singlePosition} />
    {(props.findUserByID(props.singlePosition.user_id)) ? 
      <PositionRowName state={props.state} findUserByID={props.findUserByID} singlePosition={props.singlePosition} />
      :
      <PositionRowNameMissing />}    
  </tr>
)

export default PositionRow
