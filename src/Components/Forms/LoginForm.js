import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'

import rootButtonStyle from '../Themes/Button'

const styles = theme => ({
	root: { 
		color: 'white', 
		margin: theme.spacing.unit*2 
	},

	button: Object.assign(rootButtonStyle(theme), {
		margin: theme.spacing.unit*2,
		height: '48px'
	})
})

class LoginForm extends Component {
	state = {
		// all form data, written into component state
		data: {
			userName: '',
			pin: ''
		},

		// store errors form encountered
		errors: {}, 

		// for async requests
		loading: false 
	}

	handleChange = e => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		})
	}

	handleValidate = data => {
		const err = { }

		if (!data.userName) err.userName = 'Blank username'
		if (!data.pin) err.pin = 'Blank PIN'
		if (data.pin.length !== 4) err.pin = 'PIN must be 4 numbers'
		if (isNaN(data.pin)) err.pin = 'PIN must be 4 numbers'

		return err
	}

	handleSubmit = e => {
		e.preventDefault()

		const errors = this.handleValidate(this.state.data)
		this.setState({ errors })

		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true })

			// consider submit as async
			this.props
				.submit(this.state.data)
				.catch(err => this.setState({ errors: err, loading: false }))
		}

		return false
	}

	render() {
		const { data, errors, loading } = this.state
		const { classes } = this.props

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<TextField
						fullWidth
						autoFocus
						helperText={errors.userName || ''}
						placeholder='Username'
						name='userName'
						value={data.userName}
						onChange={this.handleChange}
						className={classes.root}
						error={!!errors.userName}
					/>
					<br/>
					<TextField
						fullWidth
						helperText={errors.pin || ''}
						placeholder='PIN'
						type='password'
						name='pin'
						value={data.pin}
						onChange={this.handleChange}
						className={classes.root}
						error={!!errors.pin}
					/>
					<br/>
					<br/>
					<Button 
						fullWidth
						color='primary'
						variant='contained'
						type='submit'
						className={classes.button}
					>Login</Button>
				</form>
			</div>
		)
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoginForm)
