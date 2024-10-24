import React from 'react'
import { useSelector } from 'react-redux'
import { useMaster } from '../../pages/Master/hooks/useMaster'
import { colorConditions } from './utils/functions'
import { OPTIONS } from 'utils/constants'
import { addSignal } from 'utils/functions'
import { Card, Divider, Grid, Select, Tab, Text, Title } from 'components'
import Scenarios from '../../pages/Master/components/Scenarios'
import Adventures from '../../pages/Master/components/Adventures'
import Exploration from '../../pages/Master/components/Exploration'
import Interaction from '../../pages/Master/components/Interaction'
import Characters from '../../pages/Master/components/Characters'
import Board from '../../pages/Master/components/Board'
import Page from 'layouts/Page'

function Master() {
	const { handle, stateTab, stateValues } = useMaster()
	const { CAMPAIGN } = useSelector(({ reducer }) => reducer)

	const [tab] = stateTab

	return (
		<Page tab="Mestre" title="Escudo do Mestre">
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
			<Divider borderStyle="solid" />
			<Grid type="row" alignItems="center">
				<Grid type="column" padding={[0, 10]} minWidth={250}>
					<Card>
						<Grid type="row">
							<Grid type="column" padding={[0, 10]} minWidth={200}>
								<Select
									name="period"
									label="Período"
									options={OPTIONS.CAMPAIGNS.PERIOD}
									onSelect={handle.updateCampaign}
									stateValue={stateValues}
								/>
							</Grid>
							<Grid type="column" padding={[0, 10]} minWidth={200}>
								<Select
									name="climate"
									label="Clima"
									options={OPTIONS.CAMPAIGNS.CLIMATE}
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
			<Card margin="20px 0">
				<Board current={tab} />
			</Card>
			<Card margin="20px 0">
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