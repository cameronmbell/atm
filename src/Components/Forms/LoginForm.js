import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'

class LoginForm extends Component {
	state = {
		// all form data, written into component state
		data: {
			userName: '',
			PIN: ''
		},

		// store errors form encountered
		errors: {}, 

		// for async requests
		loading: false 
	}

	handleChange = e => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		})
	}

	handleValidate = data => {
		const err = { }

		if (!data.userName) err.userName = 'username can\'t be blank'
		if (!data.PIN) err.PIN = 'PIN can\'t be blank'
		if (data.PIN.length !== 4) err.PIN = 'PIN must be 4 characters'

		return err
	}

	handleSubmit = e => {
		e.preventDefault()

		const errors = this.handleValidate(this.state.data)
		this.setState({ errors })

		if (Object.keys(errors).length === 0) {
			this.props.submit(this.state.data)
		}

		return false
	}

	render() {
		const { data, errors } = this.state

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input 
						type='text' 
						name='userName'
						placeholder='username' 
						value={data.userName}
						onChange={this.handleChange}
					/>

					<br/>
					<input 
						type='text' 
						name='PIN'
						placeholder='PIN' 
						value={data.PIN}
						onChange={this.handleChange}
					/>

					<br/>
					{errors.userName}<br/>
					{errors.PIN}<br/>
					<input type='submit'/>
				</form>
			</div>
		)
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired
}

export default LoginForm
