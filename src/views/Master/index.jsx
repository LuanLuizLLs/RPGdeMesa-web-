import React from 'react'
import { useSelector } from 'react-redux'
import { useMaster } from './hooks/useMaster'
import { colorConditions } from './utils'
import { CAMPAIGNS } from 'constants'
import { addSignal } from 'utils'
import { Card, Divider, Grid, Select, Tab, Text, Title } from 'components'
import Scenarios from './containers/Scenarios'
import Adventures from './containers/Adventures'
import Exploration from './containers/Exploration'
import Interaction from './containers/Interaction'
import Characters from './containers/Characters'
import Board from './containers/Board'
import Page from 'layouts/Page'

function Master() {
	const { handle, stateTab, stateValues } = useMaster()
	const { CAMPAIGN } = useSelector(({ reducer }) => reducer)

	const [tab] = stateTab

	return (
		<Page tab="Mestre" title="Escudo do Mestre" width="90vw">
			<Title type="h6" color="secondary">
        #{CAMPAIGN.id} - {CAMPAIGN.name}
			</Title>
			<Card>
				<Title type="h6" textAlign="center" textTransform="capitalize">
					{CAMPAIGN.name}
				</Title>
				<Text textAlign="center">
					{CAMPAIGN.description}
				</Text>
			</Card>
			<Card margin="20px 0">
				<Grid type="row">
					<Grid type="column" padding={[10, 10]} minWidth={250}>
						<Adventures />
					</Grid>
					<Grid type="column" padding={[10, 10]} minWidth={250}>
						<Scenarios />
					</Grid>
				</Grid>
			</Card>
			<Divider borderStyle="solid" />
			<Card>
				<Grid type="container">
					<Grid type="row">
						<Grid type="column" padding={[5, 0]} minWidth={250}>
							<Title type="h6">
                Personagens:
							</Title>
							<Characters />
						</Grid>
					</Grid>
				</Grid>
			</Card>
			<Grid type="row" alignItems="center">
				<Grid type="column" padding={[0, 10]} minWidth={250}>
					<Card margin="20px 0">
						<Grid type="row">
							<Grid type="column" padding={[0, 10]} minWidth={200}>
								<Select
									name="period"
									label="Período"
									options={CAMPAIGNS.PERIOD}
									onSelect={handle.updateCampaign}
									stateValue={stateValues}
								/>
							</Grid>
							<Grid type="column" padding={[0, 10]} minWidth={200}>
								<Select
									name="climate"
									label="Clima"
									options={CAMPAIGNS.CLIMATE}
									onSelect={handle.updateCampaign}
									stateValue={stateValues}
								/>
							</Grid>
						</Grid>
					</Card>
				</Grid>
				<Grid type="column" padding={[0, 10]} minWidth={250}>
					<Card margin="20px 0">
						<Text color="primary" fontWeight="bold" textAlign="center">
              Terreno: <Text inline color={colorConditions(CAMPAIGN.ground)}>{addSignal(CAMPAIGN.ground)}</Text> |
              Recursos: <Text inline color={colorConditions(CAMPAIGN.resources)}>{addSignal(CAMPAIGN.resources)}</Text>
						</Text>
					</Card>
				</Grid>
			</Grid>
			<Divider borderStyle="solid" />
			<Card margin="20px 0">
				<Board current={tab} />
			</Card>
			<Card>
				<Tab tabs={['Interação', 'Exploração']} stateTab={stateTab}>
					{[
						<Interaction key="interaction" />,
						<Exploration key="exploration" />,
					]}
				</Tab>
			</Card>
		</Page>
	)
}

export default Master