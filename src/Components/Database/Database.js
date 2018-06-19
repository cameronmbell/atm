const electron = window.require('electron')
const path = window.require('path')
const fs = window.require('fs')

// read Json data with fs
// otherwise return defaults
function parseJson(filePath, defaults) {
	try {
		return JSON.parse(fs.readFileSync(filePath))
	} catch(error) {
		return defaults
	}
}

// Write to JSON file in config directory
// Depending on OS this dir will change
// e.g. DatabaseStore({
//		fileName: 'configFileName'
//		defaults: {
//			...
//		}
// })
class Database {
	constructor(opts) {
		// get the OS config directory
		// %APPDATA% on Windows
		// $XDG_CONFIG_HOME or ~/.config on Linux
		// ~/Library/Application Support on macOS
		const upath = (electron.app || electron.remote.app).getPath('userData')
		console.log(upath)
		this.path = path.join(upath, opts.fileName + '.json')
		this.data = parseJson(this.path, opts.defaults)
	}

	// get JSON value from key
	get(key=undefined) {
		if (key !== undefined) {
			return this.data[key]
		} else {
			return this.data
		}
	}

	// write JSON value from key
	set(key, value) {
		this.data[key] = value
		fs.writeFileSync(this.path, JSON.stringify(this.data))
	}

	// delete a key from the db
	remove(key) {
		delete this.data[key]
		fs.writeFileSync(this.path, JSON.stringify(this.data))
	}
}

export default Database
