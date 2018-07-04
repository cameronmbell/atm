const electron = window.require('electron')
const path = window.require('path')
const fs = window.require('fs')

const { BrowserWindow } = electron.remote

const Print = (data) => {
	const upath = path.join((electron.app || electron.remote.app).getPath('downloads'), 'reciept.txt')

	let win = new BrowserWindow({ show: false })

	fs.writeFile(upath, data, () => {
		win.loadURL('file://' + upath)

		// could be a potential memory leak
		// however the GC should delete the unused win data
		win.webContents.on('did-finish-load', () => {
			win.webContents.print({ silent: false }, (success) => {
				win.close()
			})
		})
	})

	return upath
}

export default Print
