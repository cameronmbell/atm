const electron = window.require('electron')
const path = window.require('path')
const fs = window.require('fs')

// read Json data with fs
// otherwise return defaults
function parseJson(filePath, defaults, callback=() => {}) {
	fs.readFile(filePath, 'utf8', (err, res) => {
		if (err)
			return callback(defaults, err)
		return callback(JSON.parse(res), null)
	})
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
		console.log('storing db in config path: ' + upath)
		this.path = path.join(upath, opts.fileName + '.json')
		this.data = opts.defaults
		
		parseJson(this.path, opts.defaults, (val, err) => {
			console.log('successfully read db file')
			this.data = val
		})
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
	set(key, value, callback=() => {}) {
		this.data[key] = value

		fs.writeFile(this.path, JSON.stringify(this.data), callback)
	}
}

export default Database
