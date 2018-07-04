import React, { Component } from 'react'

// material ui fonts
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

// JSS style object
const styles = theme => ({
	image: {
		height: '96px',
		width: 'auto',
		padding: 'none',
		margin: 'none'
	}
})

class ComponentLogo extends Component {
	render() {
		const { classes } = this.props

		return (
			<div>
				<img className={classes.image} src={require('../../Resources/FakeBank.png')}/>
			</div>
		)
	}
}

ComponentLogo.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ComponentLogo)
