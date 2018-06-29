import React from 'react'

// prop types
import PropTypes from 'prop-types'

// routing
import { Link, Route, Switch } from 'react-router-dom'

// need to validate authentication state from redux store
import { connect } from 'react-redux'
import * as loginActions from '../Actions/LoginAuth'
import * as transactionActions from '../Actions/Transaction'

// pages to route to
import SelectionForm from '../Forms/SelectionForm'
import WithdrawPage from './WithdrawPage'
import InfoPage from './InfoPage'
import SuccessPage from './SuccessPage'

const DashboardPage = ({ logout, withdraw }) => (
	<div>
		<h1>Dashboard</h1>
		<Link to='/login'>Go to login</Link>
		<button onClick={() => logout()}>logout</button>

		<Switch>
			<Route exact path='/dash/withdraw' component={WithdrawPage}/>
			<Route exact path='/dash/deposit'/>
			<Route exact path='/dash' component={SelectionForm}/>
			<Route exact path='/dash/success' component={SuccessPage}/>
		</Switch>

		<InfoPage/>
	</div>
)

DashboardPage.propTypes = {
	logout: PropTypes.func.isRequired,
	withdraw: PropTypes.func.isRequired,
}

export default connect(null, {
	logout: loginActions.logout,
	withdraw: transactionActions.withdraw
})(DashboardPage)
