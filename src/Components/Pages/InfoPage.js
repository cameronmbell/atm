import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'

// need to get user balance
import { connect } from 'react-redux'
import money from 'money-math'

class InfoPage extends Component {
	render() {
		const { user } = this.props
		return (
			<div>
				<h1>{user.fullName} Info:</h1>
				<p>{money.format('USD', user.balance)}</p>
			</div>
		)
	}
}

InfoPage.propTypes = {
	user: PropTypes.shape({
		balance: PropTypes.string.isRequired,
		fullName: PropTypes.string.isRequired
	}).isRequired
}

function onStateUpdate(state) {
	return {
		user: state.User
	}
}

export default connect(onStateUpdate)(InfoPage)
