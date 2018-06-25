import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'

class LoginForm extends Component {
	state = {
		// all form data, written into component state
		data: {
			userName: '',
			pin: ''
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
		if (!data.pin) err.pin = 'PIN can\'t be blank'
		if (data.pin.length !== 4) err.pin = 'PIN must be 4 characters'

		return err
	}

	handleSubmit = e => {
		e.preventDefault()

		const errors = this.handleValidate(this.state.data)
		this.setState({ errors })

		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })

			// consider submit as async
			this.props
				.submit(this.state.data)
				.catch(err => this.setState({ errors: err, loading: false }))
		}

		return false
	}

	render() {
		const { data, errors, loading } = this.state

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
					<br/>Login errors: {errors.userName || 'none'}<br/>

					<br/>
					<input 
						type='text' 
						name='pin'
						placeholder='PIN' 
						value={data.pin}
						onChange={this.handleChange}
					/>

					<br/>pin errors: {errors.pin || 'none'}<br/>
					<input type='submit'/>
					Loading: {!!loading?'true':'false'}
				</form>
			</div>
		)
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired
}

export default LoginForm
