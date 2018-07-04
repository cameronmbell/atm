// simulate calls to a promise based HTTP request library
// but instead read and write to local database
// keeps in mind the concept 'do not trust the client'
// and hence re-checks all information against the db

import money from 'money-math'
import Promise from 'promise'
import DatabaseUsers from './Database/DatabaseUsers'

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
					reject({ userName: 'Unknown username' })
				} else {
					if (id.pin !== credentials.pin)
						reject({ pin: 'Invalid pin' })
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
		withdraw: (user, amount) => {
			return new Promise((resolve, reject) => {
				const id = db.getUser(user.userName)

				if (id === undefined) {
					reject('Unable to find user')
				} else if (id.pin !== user.pin) {
					reject('Unable to authorise transaction')
				} else {
					let initial = id.balance

					if (money.cmp(initial, amount) < 0)
						reject('Insufficient funds')
					else {
						const balance = money.subtract(initial, amount)
						db.setUser(user.userName, { balance }, () => 
							resolve({ 
								amount, 
								balance, 
								initial, 
								date: new Date().toLocaleString()
							})
						)
					}
				}
			})
		},

		deposit: (user, amount) => {
			return new Promise((resolve, reject) => {
				const id = db.getUser(user.userName)

				if (id === undefined) {
					reject('Unable to find user')
				} else if (id.pin !== user.pin) {
					reject('Unable to authorise transaction')
				} else {
					let initial = id.balance

					if (money.cmp(amount, DEPOSIT_LIMIT) > 0)
						reject('Deposit amount too great')
					else {
						const balance = money.add(initial, amount)
						db.setUser(user.userName, { balance }, () => 
							resolve({ 
								amount, 
								balance, 
								initial, 
								date: new Date().toLocaleString()
							})
						)
					}
				}
			})
		}
	}
}
