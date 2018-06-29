// simulate calls to a promise based HTTP request library
// but instead read and write to local database
// keeps in mind the concept 'do not trust the client'
// and hence re-checks all information against the db

import money from 'money-math'
import Promise from 'promise'
import DatabaseUsers from './Database/DatabaseUsers'
import { WITHDRAWL, DEPOSIT } from './Types'

// here default database users are hardcoded
// these are stored in memory until a change is made
// in which case they are written to the db file
// to be loaded if no db file exists
const db = new DatabaseUsers({
	'Dunne': {
		fullName: 'Ryan Dunne',
		balance: '12345.00',
		pin: '1337'
	},
	'ye': {
		fullName: 'Kanye West',
		balance: '10000000.00'
	},
	'Jay Z': { },
	'Pusha T': { },
	'Biggie Smalls': { },
})

const DEPOSIT_LIMIT = '2000.00'

export default {
	user: {

		// validate credentials in the db
		login: (credentials) => {
			return new Promise((resolve, reject) => {
				const id = db.getUser(credentials.userName)

				if (id === undefined) {
					reject({ userName: 'unknown username' })
				} else {
					if (id.pin !== credentials.pin)
						reject({ pin: 'invalid pin' })
					else {
						resolve({
							...id,
							userName: credentials.userName
						})
					}
				}
			})
		},

		// modify a users balance
		transaction: (user, details) => {
			return new Promise((resolve, reject) => {
				const id = db.getUser(user.userName)

				if (id === undefined) {
					reject('unable to find user')
				} else if (id.pin !== user.pin) {
					reject('unable to use pin to authorise')
				} else {
					let initialBalance = id.balance

					switch (details.type) {
						case WITHDRAWL: {
							if (money.cmp(id.balance, details.amount) < 0)
								reject('insufficient funds to withdraw')
							else {
								const balance = money.subtract(id.balance, details.amount)
								console.log('about to withdraw')
								db.setUser(user.userName, { balance }, () => 
									resolve(Object.assign({}, details, {
										date: new Date(),
										initialBalance,
										balance
									}))
								)
							}
							break
						}

						case DEPOSIT: {
							if (money.cmp(details.amount, DEPOSIT_LIMIT) > 0)
								reject('too great deposit amount, $2000.00 limit set')
							else {
								db.setUser(user.userName, {
									balance: money.add(id.balance, details.amount)
								}, () => resolve(Object.assign({}, {
									date: new Date(),
									initialBalance
								}, details)))
							}
							break
						}
						default:
							console.warn('uncaptured api transaction: ' + details.type)
					}
				}
			})
		}
	}
}
