import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'

// routing
import { connect } from 'react-redux'

// form
import WithdrawForm from '../Forms/WithdrawForm'
import { withdraw } from '../Actions/Transaction'

class WithdrawPage extends Component {

	// on successful show success page 
	submit = (user, amount) =>  {
		console.log('submit clicked')
		console.log(this.props.withdraw)
		return this.props.withdraw(user, amount)
	}

	render() {
		return (
			<WithdrawForm submit={this.submit}/>
		)
	}
}

WithdrawPage.propTypes = {

	// redux action
	withdraw: PropTypes.func.isRequired
}

export default connect(null, { withdraw })(WithdrawPage)
