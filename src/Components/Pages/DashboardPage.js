import React from 'react'
import PropTypes from 'prop-types'

// routing
import { Link } from 'react-router-dom'

// need to validate authentication state from redux store
import { connect } from 'react-redux'
import * as actions from '../Actions/LoginAuth'

const DashboardPage = ({ logout }) => (
	<div>
		<h1>Dashboard</h1>
		<Link to='/login'>Go to login</Link>
		<button onClick={() => logout()}>logout</button>
	</div>
)

DashboardPage.propTypes = {
	logout: PropTypes.func.isRequired
}

export default connect(null, { logout: actions.logout })(DashboardPage)
