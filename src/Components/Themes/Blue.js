import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
	palette: {
		type: 'dark',
		primary: { 
			light: '#02B3F6',
			main: '#0F8ED8',
			dark: '#2257BF'
		},
		error: { main: '#E57373' },
		secondary: { main: '#F4016B' },
		background: { default: '#0C3B97' }
	}
})
