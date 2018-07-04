const rootButtonStyle = theme => ({
	border: 0,
	borderRadius: 1,
	color: theme.palette.common.white,
	height: 88,
	padding: '0 30px',
	boxShadow: 'none',
	textTransform: 'capitalize',
	fontSize: '1rem',
	fontWeight: '400',
	backgroundColor: theme.palette.primary.light,
	'&:hover': { backgroundColor: theme.palette.primary.main },
	'&:disabled': { backgroundColor: theme.palette.primary.dark }
})

export default rootButtonStyle
