import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'

// material styling
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'

// pages
import DashboardPage from './Pages/DashboardPage'
import LoginPage from './Pages/LoginPage'

// private routing
import GuestRoute from './Routes/GuestRoute'
import UserRoute from './Routes/UserRoute'

// use custom material theme
import ThemeBlue from './Themes/Blue'

const App = ({ location }) => (
	<Fragment>
		<MuiThemeProvider theme={ThemeBlue}>
			<CssBaseline/>
			<Switch>
				<UserRoute location={location} path='/dash' component={DashboardPage}/>
				<GuestRoute location={location} path='/' component={LoginPage}/>
			</Switch>
		</MuiThemeProvider>
	</Fragment>
)

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
}

export default App
