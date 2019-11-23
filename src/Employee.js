import React from 'react'

class Employee extends React.Component {

	state = {
		modalStyle: {
			position: 'absolute',
			width: '100%',
			left: '0',
			top: '30%',
			padding: '5% 0',

			fontSize: '200%',
			fontFamily: 'Arial, Helvetica, sans-serif',
			textAlign: 'center',

			background: 'gray',
			color: 'white',
			display: 'none',

			zIndex: '1'
		},

		
	}

	deleteEmployee = event => {

		this.setState({
			modalStyle: {
				position: 'absolute',
				width: '100%',
				left: '0',
				top: '30%',
				padding: '5% 0',
	
				fontSize: '200%',
				fontFamily: 'Arial, Helvetica, sans-serif',
				textAlign: 'center',
	
				background: 'gray',
				color: 'white',
				display: 'block',
	
				zIndex: '1'
	
			}
		})

		fetch('http://localhost:3004/employees/' + this.props.data.id, {
			method: 'DELETE',
		}).then(() => {
			this.props.refreshEmployees()
		});
	}

	render() {

		const containerStyle = {
			position: 'relative',
			borderRadius: '10px',
			boxShadow: '3px 3px 3px ' + (this.props.data.isActive ? 'green' : 'red') + 
					', -3px -3px 3px ' + (this.props.data.isActive ? 'green' : 'red'),

			width: '27%',
			minWidth: '300px',
			margin: '10px',
			padding: '10px 0 10px 30px'
		}

		const buttonStyle = {

			position: 'absolute',
			top: '10px',
			right: '10px',

			height: '40px',
			width: '40px',
			border: '0',
			borderRadius: '20%',

			fontSize: '120%',
			backgroundColor: '#fff',
			color: 'black',

			boxShadow: '2px 2px 2px black, -2px -2px 2px black',

			cursor: 'pointer'
		}

		const nameStyle = {
			fontSize: '150%',
			fontWeight: 'bold'
		}

		const textStyle = {
			fontSize: '120%'
		}

		return (

			<div style={containerStyle}>
				<div style={this.state.modalStyle}>
					Deleting...
        		</div>

				<p style={nameStyle}>Name: {this.props.data.name}</p>
				<p style={textStyle}>Age: {this.props.data.age}</p>
				<p style={textStyle}>Company: {this.props.data.company}</p>
				<p style={textStyle}>Email: {this.props.data.email}</p>

				<button style={buttonStyle}  title="Delete" onClick={this.deleteEmployee}>X</button>
			</div>
		)
	}
}

export default Employee