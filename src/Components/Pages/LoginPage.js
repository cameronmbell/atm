import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'

// routing
import { connect } from 'react-redux'

// login form
import LoginForm from '../Forms/LoginForm'
import { login } from '../Actions/LoginAuth'

class LoginPage extends Component {

	// on successful login redirect to homepage
	submit = (data) => 
		this.props.login(data).then(() => this.props.history.push('/'))

	render() {
		return (
			<div>
				<h1>Login Page</h1>
				<LoginForm submit={this.submit}/>
			</div>
		)
	}
}

LoginPage.propTypes = {

	// enforce react router component
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,

	// redux login action
	login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage)
