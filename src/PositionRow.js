import React from 'react'
import PositionRowIndex from './PositionRowIndex'
import PositionRowName from './PositionRowName'
import PositionRowPositionName from './PositionRowPositionName'

const PositionRow = props => (
  <tr>
    <PositionRowIndex idx={props.idx}/>
    <PositionRowPositionName singlePosition={props.singlePosition} />
    <PositionRowName findUserByID={props.findUserByID} singlePosition={props.singlePosition} />
  </tr>
)

export default PositionRow
