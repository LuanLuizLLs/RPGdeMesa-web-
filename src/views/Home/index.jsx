import React from 'react'
import Page from 'layouts/Page'
import Campaigns from './container/Campaigns'
import Characters from './container/Characters'
import { Grid } from 'components'

function Home() {
	return (
		<Page tab="Home">
			<Grid type="container" padding={[0, 0]}>
				<Grid type="row">
					<Grid type="column" padding={[20, 10]} minWidth={300}>
						<Campaigns />
					</Grid>
					<Grid type="column" padding={[20, 10]} minWidth={300}>
						<Characters />
					</Grid>
				</Grid>
			</Grid>
		</Page>
	)
}

export default Home