import React from 'react';
import { Route } from 'react-router-dom'

// pages
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'

export default props => (
	<div>
		<Route exact path='/' component={HomePage}/>
		<Route exact path='/login' component={LoginPage}/>
	</div>
)
