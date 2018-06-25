// import reducer types
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../Types'
import Api from '../Api'

// redux authentication action creator
export const userLoggedIn = (user) => ({
	type: USER_LOGGED_IN,
	user
})

export const userLoggedOut = (user) => ({
	type: USER_LOGGED_OUT
})

// call the api (db) validation
// if successfull dispatch the redux userLoggedIn action
export const login = credentials => dispatch => 
	Api.user.login(credentials).then(user => {

		// store in browser (electron) local storage
		localStorage.user = JSON.stringify(user)
		dispatch(userLoggedIn(user))
	})

// logout a user, doesn't affect db
// just remove from local storage
export const logout = () => dispatch => {
	localStorage.removeItem('user')
	dispatch(userLoggedOut())
}
