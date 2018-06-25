// action types to handle
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../Types'

// handle all user related actions
export default function User(state = {}, action = {}) {
	switch (action.type) {
		case USER_LOGGED_IN:
			return action.user
		case USER_LOGGED_OUT:
			return {}
		default:
			return state
	}
}
