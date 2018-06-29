import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'

// routing
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

// form
import WithdrawForm from '../Forms/WithdrawForm'
import { withdraw } from '../Actions/Transaction'


class WithdrawPage extends Component {
	WithdrawFormWrapper = () => (
		<WithdrawForm submit={this.submit}/>
	)

	// on successful login redirect to dashboard
	submit = (user, amount) =>  {
		console.log('submit clicked')
		console.log(this.props.withdraw)
		return this.props.withdraw(user, amount)
	}

	render() {
		return (
			<Route component={this.WithdrawFormWrapper}/>
		)
	}
}

WithdrawPage.propTypes = {

	// redux action
	withdraw: PropTypes.func.isRequired
}

export default connect(null, { withdraw })(WithdrawPage)
