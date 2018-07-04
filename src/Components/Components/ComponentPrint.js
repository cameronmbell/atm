import React from 'react'

// styling
import { IconButton } from '@material-ui/core'
import { Print } from '@material-ui/icons'

export default ({ logout }) => (
	<div>
		<IconButton onClick={() => window.print()}>
			<Print style={{ color: 'white' }}/>
		</IconButton>
	</div>
)
