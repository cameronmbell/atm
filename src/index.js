// react
import React from 'react'
import { render } from 'react-dom'

// standard redux store setup
import { createStore, applyMiddleware } from 'redux'

// pass redux store down react context with react-redux
import { Provider } from 'react-redux'

// react-router
import { HashRouter as Router, Route } from 'react-router-dom'

// thunk action middleware
import thunk from 'redux-thunk'

// material-ui static font loading
// import 'typeface-roboto'

// local setup
import './index.css'
import App from './Components/App'
import registerServiceWorker from './registerServiceWorker'

// reauthenticate user on reload
import { userLoggedIn } from './Components/Actions/LoginAuth'

// import reducer to provide to all children
import RootReducer from './Components/RootReducer'

// create redux store
const store = createStore(
	RootReducer,
	applyMiddleware(thunk)
)

// reauthenticate user on reload
// if localStorage written to
if (localStorage.user) {
	try {
		store.dispatch(userLoggedIn(JSON.parse(localStorage.user)))
	} catch(e) {
		console.warn('bad local storage')
	}
}

// draw to DOM
render((
	<Provider store={store}>
		<Router>
			<Route component={App}/>
		</Router>
	</Provider>
), document.getElementById('root'))

registerServiceWorker()
