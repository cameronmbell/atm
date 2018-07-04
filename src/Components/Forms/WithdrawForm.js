import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'

// need to get user balance for client-side validation
import { connect } from 'react-redux'
import money from 'money-math'
import { withRouter } from 'react-router-dom'
import { Typography, Grid, Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import rootButtonStyle from '../Themes/Button'

const styles = theme => ({
	root: {
		color: theme.palette.primary
	},
	button: Object.assign(rootButtonStyle(theme), { height: '48px' }),
	pinkButton: Object.assign(rootButtonStyle(theme), {
		height: '48px',
		backgroundColor: theme.palette.secondary.light,
		'&:hover': { backgroundColor: theme.palette.secondary.main },
		'&:disabled': { backgroundColor: theme.palette.secondary.dark }
	})
})

class WithdrawForm extends Component {
	state = {
		// the amount to withdraw
		data: {
			amount: '',
		},

		// for async requests
		loading: false,

		errors: ''
	}

	handleChange = e => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		})
	}

	handleSubmit = e => {
		e.preventDefault()

		this.setState({ loading: true })

		this.props
			.submit(this.props.user, this.state.data.amount)
			.then(() => this.setState({ loading: false }))
			.then(() => this.props.history.push('/dash/success'))
			.catch(err => this.setState({ errors: err }))

		return false
	}

	amountInput = ({ value }) => (
		<FormControlLabel 
			name='amount'
			value={value}
			control={<Radio color='primary'/>}
			label={'$' + money.format('USD', value)}
			disabled={money.cmp(this.props.user.balance, value) < 0}
			onChange={this.handleChange}
			checked={this.state.data.amount == value}
			className={this.props.classes.root}
		/>
	)

	render() {
		const { data, loading } = this.state
		const { classes } = this.props

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<Grid container justify='space-around'>
						<Grid item>
							<Grid container direction='column'>
								<Grid item><this.amountInput value='25.00'/></Grid>
								<Grid item><this.amountInput value='100.00'/></Grid>
								<Grid item><this.amountInput value='250.00'/></Grid>
								<Grid item><this.amountInput value='1000.00'/></Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container direction='column'>
								<Grid item><this.amountInput value='50.00'/></Grid>
								<Grid item><this.amountInput value='200.00'/></Grid>
								<Grid item><this.amountInput value='500.00'/></Grid>
								<Grid item><this.amountInput value='1500.00'/></Grid>
							</Grid>
						</Grid>
					</Grid>
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
								Make Withdrawal
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		)
	}
}

WithdrawForm.propTypes = {
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

export default connect(onStateUpdate)(withRouter(withStyles(styles)(WithdrawForm)))
