import React from 'react'

class AddFakeEmployeeForm extends React.Component {

	state = {
		age: "",

		parentName: "",
		parentPhoneNo: "",

		name: "",
		email: ""
	}

	handleValueChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		event.target.reset();
		this.props.changeActivePanel("EmployeesList");
	}

	render() {

		const divStyle = {
			position: 'relative',
			borderRadius: '10px',
			boxShadow: '1px 3px 7px grey',
			margin: '30px 20%',
			fontSize: '125%'
		}

		const formStyle = {
			padding: '5% 30px',
		}

		const gridStyle = {
			display: 'grid',
			gridTemplateColumns: '1fr 3fr',
			gap: '20px',
			marginBottom: '20px'
		}

		const labelStyle = {
			justifySelf: 'flex-end'
		}

		const inputStyle = {
			justifySelf: 'flex-start',
			width: '90%',

			padding: '5px 15px',
			fontSize: '90%'
		}

		const submitStyle = {
			width: '50%',
			height: '40px',
			margin: '0 25%',

			backgroundColor: '#0b0',
			border: '0',
			borderRadius: '10px',
			boxShadow: '0 0 5px #000',

			fontSize: '100%',
			color: 'white',

			cursor: 'pointer'
		}

		return (
			<div style={divStyle}>
				<form onSubmit={this.handleSubmit} style={formStyle} method="POST" action="">

					<div style={gridStyle} >
						<label style={labelStyle} htmlFor="addAgeInp">Age:</label>
						<input style={inputStyle} type="number" name="age" id="addAgeInp" min="0" onChange={this.handleValueChange} />
					</div>

					{
						this.state.age < 18 ? (
							<div style={gridStyle}>
								<label style={labelStyle} htmlFor="parentNameInp">Parent Name:</label>
								<input style={inputStyle} type="text" name="parentName" id="parentNameInp" 
									value={this.state.parentName} // <- trochę się boję nieskończoenj pętli, ale mi działa
									onChange={this.handleValueChange} />

								<label style={labelStyle} htmlFor="parentPhoneNumber">Parent Phone No:</label>
								<input style={inputStyle} type="number" name="parentPhoneNo" id="parentPhoneNumber"
									value={this.state.parentPhoneNo}  onChange={this.handleValueChange} />
							</div>

						) : (
								<div style={gridStyle}>
									<label style={labelStyle} htmlFor="nameInp">Name:</label>
									<input style={inputStyle} type="text" name="name" id="nameInp"
										value={this.state.name} onChange={this.handleValueChange} />

									<label style={labelStyle} htmlFor="emailInp">Email:</label>
									<input style={inputStyle} type="email" name="email" id="emailInp"
										value={this.state.email} onChange={this.handleValueChange} />
								</div>
							)}

					<div>
						<input style={submitStyle} type="submit" value="Submit" />
					</div>

				</form>
			</div>
		)
	}
}

export default AddFakeEmployeeForm