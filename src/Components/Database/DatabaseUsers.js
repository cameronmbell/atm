import Database from './Database'

// wrap around Database for user entries
// each user is defined as:
// 'userName': {
//		fullName: 'John Smith',
//		balance: '1234.00',
//		pin: '1234'
// }
class DatabaseUsers {
	// create/load the user database
	constructor(defaultUsers) {
		this.db = new Database({
			fileName: 'userDatabase',
			defaults: (defaultUsers || {})
		})
	}

	// add a new user if none exists
	// otherwise modify an existing one
	setUser(userName, props) {
		let storedUser = (this.db.get(userName) || {
			fullName: userName,
			balance: '0.00',
			pin: '0000'
		})

		// create/modify entry
		this.db.set(userName, Object.assign(storedUser, props))
	}

	// get user object
	getUser(userName) {
		return this.db.get(userName)
	}

	// remove user from db
	removeUser(userName) {
		this.db.remove(userName)
	}
}

export default DatabaseUsers
