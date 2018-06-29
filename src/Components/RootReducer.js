// generate root reducer
import { combineReducers } from 'redux'

// reducers
import User from './Reducers/User'
import Transaction from './Reducers/Transaction'

export default combineReducers({
	User,
	Transaction
})
