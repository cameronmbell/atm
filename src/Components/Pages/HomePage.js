import React from 'react';
import PropTypes from 'prop-types'

// react link
import { Link } from 'react-router-dom'

// need to validate authentication state from redux store
import { connect } from 'react-redux'
import * as actions from '../Actions/LoginAuth'

const HomePage = ({ isAuthenticated, logout }) => (
	<div>
		<h1>Home Page</h1>
		<Link to='/dash'>Dashboard</Link>
		{isAuthenticated? <button onClick={() => logout()}>Logout</button> : <Link to='/login'>Login</Link>}
	</div>
)

HomePage.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired
}

// when redux store is updated pass this data to the homepage
function onStateUpdate(state) {
	console.log(state)

	return { 
		isAuthenticated: !!state.User.pin
	}
}

export default connect(onStateUpdate, { logout: actions.logout })(HomePage)
