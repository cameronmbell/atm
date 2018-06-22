// react
import React from 'react'
import { render } from 'react-dom'

// react-router
 import { HashRouter as Router } from 'react-router-dom'

// material-ui static font loading
// import 'typeface-roboto'

// local setup
import './index.css'
import App from './Components/App'
import registerServiceWorker from './registerServiceWorker'

// draw to DOM
render((
	<Router>
		<App/>
	</Router>
), document.getElementById('root'))

registerServiceWorker()
