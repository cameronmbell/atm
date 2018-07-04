import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'

// need to get user balance for client-side validation
import { connect } from 'react-redux'
import money from 'money-math'
import { withRouter } from 'react-router-dom'

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

		if (!data.amount) err = 'amount can\'t be blank'
		if (isNaN(data.amount)) err = 'not a numeric value'

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

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input 
						type='text' 
						name='amount'
						placeholder='100'
						value={data.amount}
						onChange={this.handleChange}
					/>
					<input disabled={data.amount === ''} type='submit'/>
					Loading: {!!loading?'true':'false'}
					Errors: {err || 'none'}
					Selected Amount: {data.amount}
				</form>
				<button onClick={() => this.props.history.push('/dash')}>
					cancel deposit
				</button>
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
	}).isRequired
}

function onStateUpdate(state) {
	return {
		user: state.User
	}
}

export default connect(onStateUpdate)(withRouter(DepositForm))
