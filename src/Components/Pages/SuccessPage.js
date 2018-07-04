import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import money from 'money-math'
import { withRouter } from 'react-router-dom'
import * as Icons from '@material-ui/icons'
import rootButtonStyle from '../Themes/Button'

import Print from '../Receipt/Print'

const styles = theme => ({
	text: {
		fontSize: '2em',
		fontWeight: '600',
		textAlign: 'center'
	},
	blueText: {
		color: theme.palette.primary.light,
		textAlign: 'center'
	},
	fabButton: Object.assign(rootButtonStyle(theme), {
		width: '88px'
	})
})

class SuccessPage extends Component {
	generate = (user, transaction) => {
		const payload = {
			ACCOUNT_OWNER_NAME: user.fullName,
			TRANSACTION_TYPE: transaction.type,
			TRANSACTION_INITIAL: '$' + money.format('USD', transaction.initial),
			TRANSACTION_FINAL: '$' + money.format('USD', transaction.balance),
			TRANSACTION_AMOUNT: '$' + money.format('USD', transaction.amount),
			TRANSACTION_DATE: transaction.date
		}

		return 'FAKE BANK\n419A Windsor Road Baulkham Hills NSW 2153\n\n'
			+ Object.keys(payload).map((key) => 
				key + '\t\t' + payload[key]
			).join('\n')
	}

	print = () => {
		if (
			Object.keys(this.props.user).length === 0 ||
			Object.keys(this.props.transaction).length === 0) {

			console.warn('no recorded transaction, print request ignored')
			return
		}

		const data = this.generate(this.props.user, this.props.transaction)

		console.log('printed receipt to: ' + Print(data))
	}

	render() {
		const { classes, history } = this.props
		return (
			<div>
				<Grid container spacing={16} justify='center' alignItems='center'>
					<Grid item xs={8}>
						<Typography variant='title' className={classes.text}>
							Transaction Successful
						</Typography>
						<Typography variant='caption' className={classes.blueText}>	
							Note receipts are also printed into the download directory
						</Typography>
					</Grid>
					<Grid item xs={12} style={{height:48}}></Grid>
					<Grid item>
						<Button variant='fab' color='white' onClick={() => this.props.history.push('/dash')} className={classes.fabButton}>
							<Icons.Done/>
						</Button>
					</Grid>
					<Grid item>
						<Button variant='fab' color='white' onClick={this.print} className={classes.fabButton}>
							<Icons.Print/>
						</Button>
					</Grid>
				</Grid>
			</div>
		)
	}
}

SuccessPage.propTypes = {
	user: PropTypes.shape({
		fullName: PropTypes.string.isRequired
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	transaction: PropTypes.shape({
		initial: PropTypes.string.isRequired,
		balance: PropTypes.string.isRequired,
		amount: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired
	}).isRequired
}

function onStateUpdate(state) {
	return {
		user: state.User,
		transaction: state.Transaction
	}
}

export default connect(onStateUpdate)(withRouter(withStyles(styles)(SuccessPage)))
