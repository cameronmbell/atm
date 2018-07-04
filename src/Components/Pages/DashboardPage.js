import React, { Component } from 'react'

// prop types
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// use material ui flex grid layout
import { Grid } from '@material-ui/core'

// routing
import { Link, Route, Switch } from 'react-router-dom'

// need to validate authentication state from redux store
import { connect } from 'react-redux'
import * as loginActions from '../Actions/LoginAuth'
import * as transactionActions from '../Actions/Transaction'

// pages to route to
import InactivityTimer from '../Forms/InactivityTimer'
import SelectionForm from '../Forms/SelectionForm'
import WithdrawPage from './WithdrawPage'
import DepositPage from './DepositPage'
import SuccessPage from './SuccessPage'

import ComponentLogo from '../Components/ComponentLogo'
import ComponentInfo from '../Components/ComponentInfo'
import ComponentExit from '../Components/ComponentExit'
import ComponentPrint from '../Components/ComponentPrint'

// JSS style object
const styles = theme => ({
	root: {
		padding: '32px',
		margin: '0 auto',
		height: '100%',
		width: '100%'
	},

	tall: { height: '100%' },

	spacer: { paddingBottom: 48 }
})

class DashboardPage extends Component {
	render() {
		const { classes, logout, withdraw } = this.props

		return (
			<div className={classes.root}>
				<Grid container justify='space-between'>
					<Grid item>
						<ComponentLogo/>
					</Grid>
					<Grid item>
						<Grid spacing={0} container justify='space-between' align='center'>
							<Grid item> <InactivityTimer seconds={60}/> </Grid>
							<Grid item> 
								<ComponentPrint/>
							</Grid>
							<Grid item> 
								<ComponentExit logout={logout}/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<div className={classes.spacer}></div>
				<Grid container spacing={32} justify='space-around'>
					<Grid item xs={3}>
						<ComponentInfo/>
					</Grid>
					<Grid item xs={8}>
						<Switch>
							<Route path='/dash/withdraw' component={WithdrawPage}/>
							<Route path='/dash/deposit' component={DepositPage}/>
							<Route path='/dash/success' component={SuccessPage}/>
							<Route path='/dash' component={SelectionForm}/>
						</Switch>
					</Grid>

					<Grid item xs={1}> </Grid>
				</Grid>
			</div>
		)
	}
}

DashboardPage.propTypes = {
	logout: PropTypes.func.isRequired,
	withdraw: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired
}

export default connect(null, {
	logout: loginActions.logout,
	deposit: transactionActions.deposit,
	withdraw: transactionActions.withdraw
})(withStyles(styles)(DashboardPage))
