import React from 'react'

class AddFakeEmployeeForm extends React.Component {

	state = {
		age: "",

		parentName: "",
		parentPhoneNo: "",

		name: "",
		email: "",

		wrongPhoneNumber: false,
		wrongEmail: false
	}

	handleValueChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
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

		if(this.state.age<18) {

			if(this.validatePhoneNumber(this.state.parentPhoneNo)) {
				this.setState((prevState, props) => ({
					wrongPhoneNumber: false
				}))
			} else {
				this.setState((prevState, props) => ({
					wrongPhoneNumber: true
				}))

				return;
			}
		} else {
			if(this.validateEmail(this.state.email)) {
				this.setState((prevState, props) => ({
					wrongEmail: false
				}))
			} else {
				this.setState((prevState, props) => ({
					wrongEmail: true
				}))

				return;
			}
		}
		
		this.setState((prevState, props) => ({
			wrongPhoneNumber: false,
			wrongEmail: false
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
						<input className="form__input" type="number" name="age" id="addAgeInp" min="0" onChange={this.handleValueChange} />
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
									value={this.state.parentPhoneNo}  onChange={this.handleValueChange} />
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
										value={this.state.email} onChange={this.handleValueChange} />
										{
											this.state.wrongEmail && 
											<span className="warning">
												Write valid email address
											</span>
									}
								</div>
							)}

					<div>
						<input className="form__btn form__btn--submit" type="submit" value="Submit" />
					</div>

				</form>
			</div>
		)
	}
}

export default AddFakeEmployeeForm