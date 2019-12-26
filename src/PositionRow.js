import React from 'react'
import PositionRowIndex from './PositionRowIndex'
import PositionRowName from './PositionRowName'
import PositionRowPositionName from './PositionRowPositionName'

const listItems = []
for (let i = 0; i < 10000; i++) {
  listItems.push({ id: i, content: i })
}

const PositionRow = props => (
  <tr>
    <PositionRowIndex idx={props.idx}/>
    <PositionRowPositionName singlePosition={props.singlePosition} />
    <PositionRowName findUserByID={props.findUserByID} singlePosition={props.singlePosition} />
  </tr>
)

export default PositionRow
