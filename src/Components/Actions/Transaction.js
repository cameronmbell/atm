// import reducer types
import { WITHDRAWL, DEPOSIT } from '../Types'
import Api from '../Api'

// redux action creators
export const userMadeWithdrawl = (details) => ({
	type: WITHDRAWL,
	details
})

export const userMadeDeposit = (details) => ({
	type: DEPOSIT,
	details
})

export const withdraw = (user, amount) => dispatch =>
	Api.user.withdraw(user, amount)
	.then(details => {
		dispatch(userMadeWithdrawl(details))
	})

export const deposit = (user, amount) => dispatch =>
	Api.user.deposit(user, amount)
	.then(details => {
		dispatch(userMadeDeposit(details))
	})
