import React from 'react';

// react link
import { Link } from 'react-router-dom'

const HomePage = () => (
	<div>
		<h1>Home Page</h1>
		<Link to='/login'>
			Login
		</Link>
	</div>
)

export default HomePage
