// action types to handle
import { WITHDRAWL, DEPOSIT } from '../Types'

// handle all user related actions
export default function Transaction(state = {}, action = {}) {
	switch (action.type) {
		case WITHDRAWL: {
			sessionStorage.withdrawl = JSON.stringify(action.details)

			return Object.assign({ type: action.type }, action.details)
		}
		case DEPOSIT: {
			sessionStorage.deposit = JSON.stringify(action.details)

			return Object.assign({ type: action.type }, action.details)
		}
		default:
			return state
	}
}
