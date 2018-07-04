import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import money from 'money-math'

// material ui components
import { Grid, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import { withdraw } from '../Actions/Transaction'
import rootButtonStyle from '../Themes/Button'

const styles = theme => ({
	button: rootButtonStyle(theme),

	pinkButton: Object.assign(rootButtonStyle(theme), {
		height: 64,
		backgroundColor: theme.palette.secondary.light,
		'&:hover': { backgroundColor: theme.palette.secondary.main },
		'&:disabled': { backgroundColor: theme.palette.secondary.dark }
	})
})

class SelectionForm extends Component {
	render() {
		const { classes, history } = this.props

		return (
		<div>
			<Grid container spacing={16} justify='center'>
				<Grid item xs={12}>
					<Button fullWidth 
						variant='text' 
						className={classes.button} 
						onClick={() => history.push('/dash/withdraw')}>
						Withdraw Savings
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button fullWidth 
						variant='text' 
						className={classes.button}
						onClick={() => history.push('/dash/deposit')}>
						Deposit
					</Button>
				</Grid>

				<Grid item xs={12} style={{height:48}}></Grid>

				<Grid item xs={12}>
					<Button fullWidth variant='text' 
						className={classes.pinkButton}
						disabled={money.cmp(this.props.user.balance, '100.00') < 0}
						onClick={() =>
							this.props.withdraw(this.props.user, '100.00')
							.catch(err => console.warn({ errors: err }))
						}
					>
						$100 Quick cash Withdrawal
					</Button>
				</Grid>
			</Grid>
		</div>
		)
	}
}

SelectionForm.propTypes = {
	classes: PropTypes.object.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	user: PropTypes.shape({
		balance: PropTypes.string.isRequired
	}).isRequired,
	withdraw: PropTypes.func.isRequired
}

function onStateUpdate(state) {
	return {
		user: state.User
	}
}

export default connect(onStateUpdate, { withdraw })(withStyles(styles)(withRouter(SelectionForm)))
