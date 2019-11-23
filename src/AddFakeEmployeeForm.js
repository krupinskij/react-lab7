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
									value={this.state.parentName} // <- trochę się boję nieskończoenj pętli, ale mi działa
									onChange={this.handleValueChange} />

								<label className="form__label" htmlFor="parentPhoneNumber">Parent Phone No:</label>
								<input className="form__input" type="number" name="parentPhoneNo" id="parentPhoneNumber"
									value={this.state.parentPhoneNo}  onChange={this.handleValueChange} />
							</div>

						) : (
								<div className="form__grid">
									<label className="form__label" htmlFor="nameInp">Name:</label>
									<input className="form__input" type="text" name="name" id="nameInp"
										value={this.state.name} onChange={this.handleValueChange} />

									<label className="form__label" htmlFor="emailInp">Email:</label>
									<input className="form__input" type="email" name="email" id="emailInp"
										value={this.state.email} onChange={this.handleValueChange} />
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