import React, { Component } from 'react';

// prop types
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

// routing
import { connect } from 'react-redux'

// form
import DepositForm from '../Forms/DepositForm'
import { deposit } from '../Actions/Transaction'

class DepositPage extends Component {

	// on successful show success page 
	submit = (user, amount) =>  {
		console.log(this.props.deposit)
		return this.props.deposit(user, amount)
	}

	render() {
		return (
			<DepositForm submit={this.submit}/>
		)
	}
}

DepositPage.propTypes = {

	// redux action
	deposit: PropTypes.func.isRequired
}

export default connect(null, { deposit })(DepositPage)
