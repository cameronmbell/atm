// imports
const { app, BrowserWindow, Menu } = require('electron')

const isDev = require('electron-is-dev')
const path = require('path')
const url = require('url')

// store global window reference
// ensure GC safety
let mainWindow

let createWindow = () => {
	// create window and remove menu ribbon
	mainWindow = new BrowserWindow({ 
		minWidth: 640, minHeight: 360,
		width: 768, height: 576,
		frame: false,
		center: true
	})

	// get load url, for dev use local server, otherwise index.html
	// file:///dirname/index.html
	const getUrl = (isDev)? 'http://localhost:3000' : url.format({
		pathname: path.join(__dirname, '../build/index.html'),
		protocol: 'file',
		slashes: true
	})

	// load html from path
	mainWindow.loadURL(getUrl)

	// and add shortcuts
	const menu = Menu.buildFromTemplate(((q) => {

		// add dev tools
		if (process.env.NODE_ENV !== 'production') {
			q.push({
				accelerator: 'CmdorCtrl+I',
				click: (item, focusedWindow) => {
					focusedWindow.toggleDevTools()
				}
			})
		}

		// fix mac electron button
		return (process.platform === 'darwin')? q.unshift({}) : q

	})([
		{ // quit shortcut
			accelerator: 'CmdorCtrl+Q',
			click: () => {
				app.quit()
			}
		}, { // add Ctrl+R to reload shortcut
			role: 'reload'
		}
	]))

	mainWindow.setMenu(menu)

	// destroy instance
	mainWindow.on('closed', () => {
		win = null
	})
}

// attach create to start event
app.on('ready', createWindow)

// create new window on macOS ready
app.on('activate', () => {
	if (mainWindow !== null) {
		createWindow()
	}
})

// destroy window unless macOS
// otherwise store in tray
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

