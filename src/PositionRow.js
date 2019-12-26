import React from 'react'
import PositionRowIndex from './PositionRowIndex'
import PositionRowName from './PositionRowName'
import PositionRowPositionName from './PositionRowPositionName'
import PositionRowNameMissing from './PositionRowNameMissing'

const listItems = []
for (let i = 0; i < 10000; i++) {
  listItems.push({ id: i, content: i })
}

const PositionRow = props => (
  <tr className={(props.findUserByID(props.singlePosition.user_id)) ? null : 'position-not-filled'}>
    <PositionRowIndex idx={props.idx}/>
    <PositionRowPositionName singlePosition={props.singlePosition} />
    {(props.findUserByID(props.singlePosition.user_id)) ? 
      <PositionRowName findUserByID={props.findUserByID} singlePosition={props.singlePosition} />
      :
      <PositionRowNameMissing />}    
  </tr>
)

export default PositionRow
