// action types to handle
import { WITHDRAWL, DEPOSIT, USER_LOGGED_IN, USER_LOGGED_OUT } from '../Types'

// handle all user related actions
export default function User(state = {}, action = {}) {
	switch (action.type) {
		case USER_LOGGED_IN:
			return action.user
		case USER_LOGGED_OUT:
			return {}
		case WITHDRAWL: {
			const user = Object.assign({}, 
				state, { 
					balance: action.details.balance 
				}
			)

			sessionStorage.user = JSON.stringify(user)
			return user
		}
		case DEPOSIT: {
			const user = Object.assign({}, 
				state, { 
					balance: action.details.balance 
				}
			)

			sessionStorage.user = JSON.stringify(user)
			return user
		}
		default:
			return state
	}
}
