import React from 'react'

// styling
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

export default ({ logout }) => (
	<div>
		<IconButton onClick={logout}>
			<Close style={{ color: 'white' }}/>
		</IconButton>
	</div>
)
