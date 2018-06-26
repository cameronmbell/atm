// simulate calls to a promise based HTTP request library
// but instead read and write to local database

import DatabaseUsers from './Database/DatabaseUsers'

// here default database users are hardcoded
// to be loaded if no db exists
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

export default {
	user: {

		// validate credentials in the db
		login: (credentials) => 
			new Promise((resolve, reject) => {
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
	}
}
