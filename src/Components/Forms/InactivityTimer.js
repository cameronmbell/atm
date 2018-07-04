import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as loginActions from '../Actions/LoginAuth'
import { Typography, withStyles } from '@material-ui/core'

const styles = theme => ({
	text: {
		vericalAlign: 'middle',
		display: 'inline-block',
		lineHeight: '48px'
	}
})

class InactivityTimer extends Component {
	state = { 
		counter: this.props.seconds,
		timer: null
	}

	tick = () => {
		this.setState({ 
			counter: this.state.counter - 1,
		})

		if (this.state.counter <= 0) {
			clearInterval(this.state.timer)
			this.props.logout()
		}
	}

	resetTimer = () => {
		this.setState({ 
			counter: this.props.seconds
		})
	}

	componentDidMount = () => {
		this.setState({ timer: setInterval(this.tick, 1000) })

		document.onmousemove = this.resetTimer;
		document.onmousedown = this.resetTimer;
		document.ontouchstart = this.resetTimer;
		document.onclick = this.resetTimer;
		document.onscroll = this.resetTimer;
		document.onkeypress = this.resetTimer;
	}

	componentWillUnmount = () => {
		clearInterval(this.state.timer)
	}

	render() {
		const { classes } = this.props

		return (
			<Typography variant='title' className={classes.text}>
				{(this.state.counter < this.props.seconds / 2)?this.state.counter:''}
			</Typography>
		)
	}
}

InactivityTimer.propTypes = {
	seconds: PropTypes.number.isRequired,
	logout: PropTypes.func.isRequired
}

export default connect(null, { logout: loginActions.logout })(withStyles(styles)(InactivityTimer))
