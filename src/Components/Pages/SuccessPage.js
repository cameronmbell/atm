import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import money from 'money-math'

import Print from '../Receipt/Print'

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
		return (
			<div>
				Success
				<Link to='/dash'>ok</Link>
				<button onClick={this.print}>
					print reciept
				</button>
			</div>
		)
	}
}

SuccessPage.propTypes = {
	user: PropTypes.shape({
		fullName: PropTypes.string.isRequired
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

export default connect(onStateUpdate)(SuccessPage)
