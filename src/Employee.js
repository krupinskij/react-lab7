import React from 'react'

class Employee extends React.Component {

	state = {
		busy: false
	}

	deleteEmployee = event => {

		this.setState((prevState, props) => ({
			busy: true
		}))

		fetch('http://localhost:3004/employees/' + this.props.data.id, {
			method: 'DELETE',
		}).then(() => {
			this.props.refreshEmployees()
		});
	}

	render() {

		const boxShadowStyle = {
			boxShadow: 
				'3px 3px 3px ' + (this.props.data.isActive ? 'green' : 'red') + ', ' +
				'-3px -3px 3px ' + (this.props.data.isActive ? 'green' : 'red'),
		}

		return (

			<div className="employee" style={boxShadowStyle}>
				
				{
					this.state.busy && <div className="modal">Deleting...</div>
				}
				
				<p className="employee__data--name">Name: {this.props.data.name}</p>
				<p className="employee__data">Age: {this.props.data.age}</p>
				<p className="employee__data">Company: {this.props.data.company}</p>
				<p className="employee__data">Email: {this.props.data.email}</p>

				<button className="employee__delete" title="Delete" onClick={this.deleteEmployee}>X</button>
			</div>
		)
	}
}

export default Employee