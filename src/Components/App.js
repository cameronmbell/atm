import React from 'react';
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'

// pages
import DashboardPage from './Pages/DashboardPage'
import LoginPage from './Pages/LoginPage'

// private routing
import GuestRoute from './Routes/GuestRoute'
import UserRoute from './Routes/UserRoute'

const App = ({ location }) => (
	<div>
		<Switch>
			<UserRoute location={location} path='/dash' component={DashboardPage}/>
			<GuestRoute location={location} path='/' component={LoginPage}/>
		</Switch>
	</div>
)

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
}

export default App
