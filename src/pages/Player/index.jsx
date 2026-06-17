import { Box, Card, Divider, Grid, Input, Tab, Text, TextArea, Title } from 'components'
import { usePlayer } from '../../pages/Player/hooks/usePlayer'
import { characterStore } from './utils/store'
import Inventory from './components/Inventory'
import Abilities from './components/Abilities'
import Features from './components/Features'
import useStore from 'hooks/useStore'
import Page from 'layouts/Page'

function Player() {
	const { stateTabs, stateValues } = usePlayer()

	const CHARACTER = useStore(characterStore)

	return (
		<Page tab="Jogador" title="Ficha do Jogador">
			<Title type="h6" color="secondary">
        #{CHARACTER.id} - {CHARACTER.name}
			</Title>
			<Card>
				<Grid type="container">
					<Grid type="row">
						<Grid type="column" padding={[0, 5]} minWidth={200}>
							<Input
								readOnly
								name="name"
								label="Nome"
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" padding={[0, 5]} minWidth={200}>
							<Input
								readOnly
								name="race"
								label="Raça"
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" padding={[0, 5]} minWidth={200}>
							<Input
								readOnly
								name="caste"
								label="Classe"
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" padding={[0, 5]} minWidth={200}>
							<Input
								readOnly
								name="tendency"
								label="Tendência"
								stateValue={stateValues}
							/>
						</Grid>
					</Grid>
					<Grid type="row">
						<Grid type="column" padding={[0, 5]}>
							<TextArea
								readOnly
								name="description"
								label="Descrição"
								stateValue={stateValues}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Card>
			<Grid type="row" margin={[10, 0]} alignItems="center">
				<Grid type="column" padding={[10, 10]} minWidth={250}>
					<Card>
						<Box display="flex" justifyContent="space-around" flexWrap="wrap">
							<Text fontSize="medium" textAlign="center" whiteSpace="nowrap">
                💪 FOR {CHARACTER.modified.strength} | 👋 DES {CHARACTER.modified.dexterity} | ✊ CON {CHARACTER.modified.constitution}
							</Text>
							<Text fontSize="medium" textAlign="center" whiteSpace="nowrap">
                📙 INT {CHARACTER.modified.intelligence} | 🙌 SAB {CHARACTER.modified.wisdom} | 🤝 CAR {CHARACTER.modified.charisma}
							</Text>
						</Box>
					</Card>
				</Grid>
				<Grid type="column" padding={[10, 10]} minWidth={250}>
					<Card>
						<Grid type="row">
							<Grid type="column" padding={[0, 5]} minWidth={150}>
								<Input
									readOnly
									start="❤️"
									end={`/${CHARACTER.capacity.life}`}
									name="life"
									type="number"
									label="Vida"
									fontSize="medium"
									stateValue={stateValues}
								/>
							</Grid>
							<Grid type="column" padding={[0, 5]} minWidth={150}>
								<Input
									readOnly
									start="👣"
									name="actions"
									type="number"
									label="Ações"
									fontSize="medium"
									stateValue={stateValues}
								/>
							</Grid>
							<Grid type="column" padding={[0, 5]} minWidth={150}>
								<Input
									readOnly
									start="💰"
									name="coins"
									type="number"
									label="Moedas"
									fontSize="medium"
									stateValue={stateValues}
								/>
							</Grid>
						</Grid>
					</Card>
				</Grid>
			</Grid>
			<Divider borderStyle="solid" />
			<Card>
				<Tab tabs={['Características', 'Habilidades', 'Inventário']} stateTab={stateTabs}>
					{[
						<Features key="features" />,
						<Abilities key="abilities" />,
						<Inventory key="inventory" />,
					]}
				</Tab>
			</Card>
		</Page>
	)
}

export default Player