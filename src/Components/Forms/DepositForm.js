import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'

// need to get user balance for client-side validation
import { connect } from 'react-redux'
import money from 'money-math'
import { withRouter } from 'react-router-dom'
import { TextField, Typography, Grid, Button } from '@material-ui/core';
import rootButtonStyle from '../Themes/Button'

const styles = theme => ({
	root: { 
		color: 'white', 
		margin: theme.spacing.unit*2 
	},
	button: Object.assign(rootButtonStyle(theme), { height: '48px' }),
	pinkButton: Object.assign(rootButtonStyle(theme), {
		height: '48px',
		backgroundColor: theme.palette.secondary.light,
		'&:hover': { backgroundColor: theme.palette.secondary.main },
		'&:disabled': { backgroundColor: theme.palette.secondary.dark }
	})
})

class DepositForm extends Component {
	state = {
		// the amount to deposit
		data: {
			amount: '',
		},

		// for async requests
		loading: false,

		err: ''
	}

	handleValidate = data => {
		let err = ''

		if (!data.amount) err = 'Blank amount'
		if (isNaN(data.amount)) err = 'Not a numeric value'

		return err
	}

	handleChange = e => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		})
	}

	handleSubmit = e => {
		e.preventDefault()

		const errors = this.handleValidate(this.state.data)
		this.setState({ err: errors })

		if (errors.length === 0) {
			this.setState({ loading: true })

			// enforce 2dp on input
			let amount = Number(this.state.data.amount).toFixed(2)

			this.props
				.submit(this.props.user, amount)
				.then(() => this.props.history.push('/dash/success'))
				.catch(err => this.setState({ err, loading: false }))
		}

		return false
	}

	amountInput = ({ value }) => (
		<div>
			<input
				type='radio'
				name='amount'
				value={value}
				onChange={this.handleChange}
				disabled={money.cmp(this.props.user.balance, value) < 0}
			/>
				${money.format('USD', value)}
			<br/>
		</div>
	)

	render() {
		const { data, loading, err } = this.state
		const { classes } = this.props

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<TextField
						fullWidth
						autoFocus
						helperText={err || ''}
						placeholder='Amount to deposit, e.g. 250'
						name='amount'
						value={data.amount}
						onChange={this.handleChange}
						className={classes.root}
						error={!!err}
					/>
					<br/>
					<br/>
	
					<Grid container spacing={16} justify='center'>
						<Grid item xs={12} style={{height:48}}></Grid>
						<Grid item xs={6}>
							<Button fullWidth 
								variant='text' 
								className={classes.pinkButton}
								onClick={() => this.props.history.push('/dash')}
							>
								Cancel
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button fullWidth 
								variant='text' 
								type='submit'
								className={classes.button}
								disabled={data.amount === ''}
							>
								Make Deposit
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		)
	}
}

DepositForm.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	submit: PropTypes.func.isRequired,
	user: PropTypes.shape({
		balance: PropTypes.string.isRequired
	}).isRequired,
	classes: PropTypes.object.isRequired
}

function onStateUpdate(state) {
	return {
		user: state.User
	}
}

export default connect(onStateUpdate)(withRouter(withStyles(styles)(DepositForm)))
