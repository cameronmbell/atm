import React, { Component } from 'react';

// login form
import LoginForm from '../Forms/LoginForm'

class LoginPage extends Component {
	submit = (data) => {
		console.log(data)
	}

	render() {
		return (
			<div>
				<h1>Login Page</h1>
				<LoginForm submit={this.submit}/>
			</div>
		)
	}
}

export default LoginPage
