import React from 'react'
import PropTypes from 'prop-types'

// routing
import { Route, Redirect } from 'react-router-dom'

// redux
import { connect } from 'react-redux'

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
	<Route 
		{...rest}
		render={props => 
			isAuthenticated? <Component {...props}/> : <Redirect to='/login'/>
		}
	/>
)

UserRoute.propTypes = {
	component: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
}

// when redux store is updated pass this data
function onStateUpdate(state) {
	return {
		isAuthenticated: !!state.User.pin
	}
}

export default connect(onStateUpdate)(UserRoute)
