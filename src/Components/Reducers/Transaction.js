// action types to handle
import { TRANSACTION } from '../Types'

// handle all user related actions
export default function Transaction(state = {}, action = {}) {
	switch (action.type) {
		case TRANSACTION:
			return action
		default:
			return state
	}
}
