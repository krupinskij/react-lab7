import React from 'react'

class AddFakeEmployeeForm extends React.Component {

	state = {
		age: "",

		parentName: "",
		parentPhoneNo: "",

		name: "",
		email: "",

		wrongPhoneNumber: true,
		wrongEmail: true,
		canSubmit: false
	}

	handleValueChange = (event) => {
		this.setState((prevState, props) => ({
			[event.target.name]: event.target.value
		}))
	}

	handleAgeChange = (event) => {
		const newAge = event.target.value;
		this.setState((prevState, props) => ({
			age: newAge,
			canSubmit: newAge<18 ? !prevState.wrongPhoneNumber : !prevState.wrongEmail
		}))
	}

	handlePhoneNumberChange = (event) => {
		const value = event.target.value
		const isValid = this.validatePhoneNumber(value);

		this.setState((prevState, props) => ({
			parentPhoneNo: value,
			wrongPhoneNumber: !isValid,
			canSubmit: isValid
		}))
	}

	handleEmailChange = (event) => {
		const value = event.target.value
		const isValid = this.validateEmail(value);

		this.setState((prevState, props) => ({
			email: value,
			wrongEmail: !isValid,
			canSubmit: isValid
		}))
	}

	validatePhoneNumber = (phoneNumber) => {
		return phoneNumber.length===9 && Number.isInteger(+phoneNumber)
	}

	validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.setState((prevState, props) => ({
			wrongPhoneNumber: false,
			wrongEmail: false,
			canSubmit: true
		}))
		event.target.reset();
		this.props.changeActivePanel("EmployeesList");
	}

	render() {

		return (
			<div className="form__container">
				<form onSubmit={this.handleSubmit} className="form" method="POST" action="">

					<div className="form__grid" >
						<label className="form__label" htmlFor="addAgeInp">Age:</label>
						<input className="form__input" type="number" name="age" id="addAgeInp" min="0" onChange={this.handleAgeChange} />
					</div>

					{
						this.state.age < 18 ? (
							<div className="form__grid">
								<label className="form__label" htmlFor="parentNameInp">Parent Name:</label>
								<input className="form__input" type="text" name="parentName" id="parentNameInp" 
									value={this.state.parentName} // <- trochę się boję nieskończonej pętli, ale mi działa
									onChange={this.handleValueChange} />

								<label className="form__label" htmlFor="parentPhoneNumber">Parent Phone No:</label>
								<input className="form__input" type="text" name="parentPhoneNo" id="parentPhoneNumber"
									value={this.state.parentPhoneNo}  onChange={this.handlePhoneNumberChange} />
									{
										this.state.wrongPhoneNumber && 
										<span className="warning">
											Phone number can only contain digits and it has to be exactly 9 digits
										</span>
									}
							</div>

						) : (
								<div className="form__grid">
									<label className="form__label" htmlFor="nameInp">Name:</label>
									<input className="form__input" type="text" name="name" id="nameInp"
										value={this.state.name} onChange={this.handleValueChange} />

									<label className="form__label" htmlFor="emailInp">Email:</label>
									<input className="form__input" type="text" name="email" id="emailInp"
										value={this.state.email} onChange={this.handleEmailChange} />
										{
											this.state.wrongEmail && 
											<span className="warning">
												Write valid email address
											</span>
									}
								</div>
							)}

					<div>
						<input className="form__btn form__btn--submit" type="submit" value="Submit"
							disabled={!this.state.canSubmit} />
					</div>

				</form>
			</div>
		)
	}
}

export default AddFakeEmployeeForm