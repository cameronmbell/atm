import React from 'react';
import { Route } from 'react-router-dom'

// database manager import
import { DatabaseUsers } from './Database'

// pages
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'

const db = new DatabaseUsers({
	'Dunne': {
		fullName: 'Ryan Dunne',
		balance: '12345.00',
		pin: '1337'
	}
})

console.log(db.getUser('Dunne'))

export default props => (
	<div>
		<Route exact path='/' component={HomePage}/>
		<Route exact path='/login' component={LoginPage}/>
	</div>
)
