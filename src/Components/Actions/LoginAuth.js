// import reducer types
import { USER_LOGGED_IN } from '../Types'
import Api from '../Api'

// redux authentication action creator
export const userLoggedIn = (user) => ({
	type: USER_LOGGED_IN,
	user
})

// call the api (db) validation
// if successfull dispatch the redux userLoggedIn action
export const login = credentials => dispatch => 
	Api.user.login(credentials).then(user => dispatch(userLoggedIn(user)))

