import React, { Component } from 'react';

// material styling
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// material text
import { Typography } from '@material-ui/core'

// need to get user balance
import { connect } from 'react-redux'
import money from 'money-math'

const styles = theme => ({
	blueText: {
		color: theme.palette.primary.light
	},
	mainText: {
		fontSize: 'calc(1.2em + 1vw)',
		fontWeight: '600',
		paddingBottom: theme.spacing.unit*2
	}
})

class ComponentInfo extends Component {
	render() {
		const { classes, user } = this.props

		return (
			<div>
				<Typography variant='caption' className={classes.blueText}>
					Account Owner
				</Typography>
				<Typography variant='title' className={classes.mainText}>
					{user.fullName}
				</Typography>

				<Typography variant='caption' className={classes.blueText}>
					Savings
				</Typography>
				<Typography variant='title' className={classes.mainText}>
					{'$' + money.format('USD', user.balance)}
				</Typography>
			</div>
		)
	}
}

ComponentInfo.propTypes = {
	user: PropTypes.shape({
		balance: PropTypes.string.isRequired,
		fullName: PropTypes.string.isRequired
	}).isRequired,
	classes: PropTypes.object.isRequired,
}

function onStateUpdate(state) {
	return {
		user: state.User
	}
}

export default connect(onStateUpdate)(withStyles(styles)(ComponentInfo))
