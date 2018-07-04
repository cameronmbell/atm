import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// use material ui flex grid layout
import { Grid } from '@material-ui/core'

// routing
import { connect } from 'react-redux'

// routing
import { Link } from 'react-router-dom'

// login form
import ComponentLogo from '../Components/ComponentLogo'
import LoginForm from '../Forms/LoginForm'
import { login } from '../Actions/LoginAuth'

// JSS style object
const styles = theme => ({
	root: {
		height: '100% !important',
		width: '100% !important'
	},

	form: {
		height: '100%',
		textAlign: 'center'
	},
})

class LoginPage extends Component {

	// on successful login redirect to dashboard
	submit = (data) => 
		this.props.login(data).then(() => this.props.history.push('/dash'))

	render() {
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<Grid container
					spacing={32}
					alignItems='center'
					direction='column'
					justify='center'
					className={classes.form}>
					<Grid item>
						<ComponentLogo/>
					</Grid>
					<Grid item>
						<LoginForm submit={this.submit}/>
					</Grid>
				</Grid>
			</div>
		)
	}
}

LoginPage.propTypes = {

	// enforce react router component
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,

	// redux login action
	login: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired
}

export default connect(null, { login })(withStyles(styles)(LoginPage))
