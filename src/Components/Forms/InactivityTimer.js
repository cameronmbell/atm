import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as loginActions from '../Actions/LoginAuth'

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
		return (
			<div>
				{(this.state.counter < this.props.seconds / 2)?this.state.counter:''}
			</div>
		)
	}
}

InactivityTimer.propTypes = {
	seconds: PropTypes.number.isRequired,
	logout: PropTypes.func.isRequired
}

export default connect(null, { logout: loginActions.logout })(InactivityTimer)
