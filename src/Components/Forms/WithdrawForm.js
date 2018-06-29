import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'

// need to get user balance for client-side validation
import { connect } from 'react-redux'
import money from 'money-math'
import { Route, withRouter } from 'react-router-dom'

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
			.then(() => console.log('submitting'))
			.then(() => this.props.history.push('/dash/success'))
			.catch(err => this.setState({ errors: err }))

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
		const { data, loading } = this.state

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<this.amountInput value='25.00' />
					<this.amountInput value='50.00' />
					<this.amountInput value='100.00' />
					<this.amountInput value='250.00' />
					<this.amountInput value='500.00' />
					<this.amountInput value='500000.00' />
					<input disabled={data.amount === ''} type='submit'/>
					Loading: {!!loading?'true':'false'}
					Selected Amount: {data.amount}
				</form>
				<button onClick={() => this.props.history.push('/dash')}>
					cancel withdrawl
				</button>
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
	}).isRequired
}

function onStateUpdate(state) {
	return {
		user: state.User
	}
}

export default connect(onStateUpdate)(withRouter(WithdrawForm))
