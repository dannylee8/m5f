import React from 'react'
import PositionRowIndex from './PositionRowIndex'
import PositionRowName from './PositionRowName'

const PositionRow = props => (
  <tr>
    <PositionRowIndex idx={props.idx}/>
    <PositionRowName singlePosition={props.singlePosition} />
  </tr>
)

export default PositionRow
