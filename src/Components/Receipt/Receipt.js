import React, { Component } from 'react'

// props
import PropTypes from 'prop-types'

class WithdrawReceipt extends Component (
	render() {
		const { props }

		return (
			<div>
				<h1>FAKE BANK</h1>
				<h2>{props.accountOwner}</h2>
				<p>
					419A Windsor Road, Baulkham Hills, NSW, 2153<br/>
					{props.account}
					<hr/>
					Transaction type: Withdrawal<br/>
					Pre-transaction balance: {props.initialBalance}</br>
					Final balance: {props.finalBalance}</br>
					<b>Withdrawal amount: {props.withdrawAmount}</b>
					<hr/>
					{props.transactionDate.toLocaleDateString()} {props.transactionDate.toLocalTimeString()}
				</p>
			</div>
		)
	}
)

WithdrawReceipt.propTypes = {
	accountOwner: PropTypes.string.isRequired,
	initialBalance: PropTypes.string.isRequired,
	finalBalance: PropTypes.string.isRequired,
	withdrawAmount: PropTypes.string.isRequired,
	transactionDate: PropTypes.object.isRequred,
	account: PropTypes.onOf(['credit', 'savings']).isRequired
}

export default WithdrawReceipt
