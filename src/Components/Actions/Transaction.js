// import reducer types
import { TRANSACTION, WITHDRAWL, DEPOSIT } from '../Types'
import Api from '../Api'

// redux action creators
export const userMadeTransaction = (details) => ({
	type: TRANSACTION,
	details
})

export const withdraw = (user, amount) => dispatch =>
	Api.user.transaction(user, { type: WITHDRAWL, amount })
	.then(details => {
		console.log('api success, now to dispatch')
		dispatch(userMadeTransaction(details))
	})

export const deposit = (user, amount) => dispatch =>
	Api.user.transaction(user, { type: DEPOSIT, amount })
	.then(details => {
		console.log('api success, now to dispatch')
		dispatch(userMadeTransaction(details))
	})
