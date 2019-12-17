import React from 'react'
import Checkbox from "./Checkbox";

const CheckboxGroup = (props) => {
	props.roleOptions.map(roleOption => {
			<>
				<table className='new-user-table'>
					<tbody>
						{createCheckboxes()}
					</tbody>
				</table>
			</>
	});


	let createCheckbox = option => (
		<tr key={option}>
			<td>
				<Checkbox
					label={option}
					isSelected={props.state.checkboxes[option]}
					onCheckboxChange={props.handleCheckboxChange}
					key={option}
				/>
			</td>
		</tr>
	)
	
	
	
	
	let createSelectedCheckbox = option => (
		<tr key={option}>
			<td>
				<Checkbox
					label={option}
					isSelected={this.state.checkboxes[option]}
					onCheckboxChange={this.handleCheckboxChange}
					key={option}
				/>
			</td>
			<td>
				<Checkbox
					label={option}
					isSelected={this.state.checkboxes[option]}
					onCheckboxChange={this.handleCheckboxChange}
					key={option}
				/>
			</td>
		</tr>    
	)

} 
export default CheckboxGroup


