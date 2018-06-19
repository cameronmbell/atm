import React from 'react';
import { DatabaseUsers } from './Database'

const db = new DatabaseUsers({
	'Dunne': {
		fullName: 'Ryan Dunne',
		balance: '12345.00',
		pin: '9899'
	}
})

export default props => (
	<div>
		<h1>Apalak is the best!!</h1>
	</div>
)
