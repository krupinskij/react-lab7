import React from 'react'

class AddEmployeeForm extends React.Component {

	state = {
		name: "",
		age: "",
		company: "",
		email: "",
		isActive: false,

		busy: false
	}

	handleValueChange = (event) => {
		const value = event.target.value;
		const name = event.target.name
		
		this.setState((prevState, props) => ({
			[name]: value
		}))
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			name: this.state.name,
			age: +this.state.age,
			company: this.state.company,
			email: this.state.email,
			isActive: this.state.isActive === "on" ? true : false
		}

		event.target.reset();
		this.setState((prevState, props) => ({
			busy: true
		}))


		fetch('http://localhost:3004/employees', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then(() => {

			this.props.refreshEmployees()
			.then(() => {

				this.setState((prevState, props) => ({
					busy: false
				}))

				this.props.changeActivePanel("EmployeesList");

			});
			
		});
	}

	render() {

		return (
			<div className="form__container">

				{
					this.state.busy && <div className="modal"> Saving... </div>
				}

				<form onSubmit={this.handleSubmit} className="form" method="POST" action="">

					<div className="form__grid" >
						<label className="form__label" htmlFor="addNameInp">Name:</label>
						<input className="form__input" type="text" name="name" id="addNameInp" onChange={this.handleValueChange} />

						<label className="form__label" htmlFor="addAgeInp">Age:</label>
						<input className="form__input" type="number" name="age" id="addAgeInp" min="0" onChange={this.handleValueChange} />

						<label className="form__label" htmlFor="addCompanyInp">Company:</label>
						<input className="form__input" type="text" name="company" id="addCompanyInp" onChange={this.handleValueChange} />

						<label className="form__label" htmlFor="addEmailInp">Email:</label>
						<input className="form__input" type="email" name="email" id="addEmailInp" onChange={this.handleValueChange} />

						<label className="form__label" htmlFor="addActiveInp">Active:</label>
						<input className="form__input--checkbox" type="checkbox" name="isActive" id="addActiveInp" onChange={this.handleValueChange} />

					</div>

					<div className="form__buttons">
						<input className="form__btn form__btn--submit" type="submit" value="Save" />
						<input className="form__btn form__btn--cancel" type="reset" value="Cancel" onClick={() => { this.props.changeActivePanel("EmployeesList") }} />
					</div>

				</form>
			</div>
		)
	}
}

export default AddEmployeeForm