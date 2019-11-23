import React from 'react'
import Employee from './Employee'

class EmployeesList extends React.Component {

	render() {

		return (
			<div>
				{
					this.props.employees.length ?
						(
							<div>
								<div className="employees-list">
								{
									this.props.employees.map(employee => {
										return(
											<Employee key={employee.id} data={employee} refreshEmployees={this.props.refreshEmployees} />
										)
									})
								}
								</div>
								
								<button className="employees-list__button" onClick={() => { this.props.changeActivePanel("AddEmployeeForm") }}>
									Add employee
								</button>

								<button className="employees-list__button" onClick={() => { this.props.changeActivePanel("AddFakeEmployeeForm") }}>
									Add fake employee
								</button>
							</div>
							) : (
							<div className="modal">Loading...</div>
						)
				}
			</div>
		)
	}

}

export default EmployeesList