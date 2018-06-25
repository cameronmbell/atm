// react
import React from 'react'
import { render } from 'react-dom'

// standard redux store setup
import { createStore, applyMiddleware } from 'redux'

// pass redux store down react context with react-redux
import { Provider } from 'react-redux'

// react-router
import { HashRouter as Router } from 'react-router-dom'

// thunk action middleware
import thunk from 'redux-thunk'

// material-ui static font loading
// import 'typeface-roboto'

// local setup
import './index.css'
import App from './Components/App'
import registerServiceWorker from './registerServiceWorker'

// import reducer to provide to all children
import RootReducer from './Components/RootReducer'

// create redux store
const store = createStore(
	RootReducer,
	applyMiddleware(thunk)
)

// draw to DOM
render((
	<Router>
		<Provider store={store}>
			<App/>
		</Provider>
	</Router>
), document.getElementById('root'))

registerServiceWorker()
