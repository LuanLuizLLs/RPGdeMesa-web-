import { Card, Grid, Input, Paper, Tab, Text, TextArea } from 'components'
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
		<Page tab="Jogador">
			<Card maxWidth={1080}>
				<Grid type="container">
					<Grid type="row">
						<Grid type="column" padding={[0, 5]} minWidth={200}>
							<Input
								readOnly
								name="name"
								label="Nome"
								stateValue={stateValues}
							/>
							<TextArea
								readOnly
								name="description"
								label="Descrição"
								stateValue={stateValues}
							/>
						</Grid>
					</Grid>
					<Grid type="row">
						<Grid type="column" padding={[0, 5]}>
							<Input
								readOnly
								start="❤️"
								end={`/${CHARACTER.capacity.life}`}
								name="life"
								type="number"
								label="Vida"
								fontSize="small"
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" padding={[0, 5]}>
							<Input
								readOnly
								start="👣"
								name="actions"
								type="number"
								label="Ações"
								fontSize="small"
								stateValue={stateValues}
							/>
						</Grid>
						<Grid type="column" padding={[0, 5]}>
							<Input
								readOnly
								start="💰"
								name="coins"
								type="number"
								label="Moedas"
								fontSize="small"
								stateValue={stateValues}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid type="row" padding={[10, 0]}>
					<Grid type="column" padding={[10, 10]}>
						<Paper backgroundColor="secondary">
							<Text fontWeight="bold" textAlign="center" color="primary">Atributos Físicos</Text>
							<Text fontSize="small" textAlign="center" whiteSpace="nowrap">
								💪 FOR {CHARACTER.modified.strength} | 👋 DES {CHARACTER.modified.dexterity} | ✊ CON {CHARACTER.modified.constitution}
							</Text>
						</Paper>
					</Grid>
					<Grid type="column" padding={[10, 10]}>
						<Paper backgroundColor="secondary">
							<Text fontWeight="bold" textAlign="center" color="primary">Atributos Mentais</Text>
							<Text fontSize="small" textAlign="center" whiteSpace="nowrap">
								📙 INT {CHARACTER.modified.intelligence} | 🙌 SAB {CHARACTER.modified.wisdom} | 🤝 CAR {CHARACTER.modified.charisma}
							</Text>
						</Paper>
					</Grid>
				</Grid>
				<Grid type="row">
					<Grid type="column">
						<Tab tabs={['Características', 'Habilidades', 'Inventário']} stateTab={stateTabs}>
							{[
								<Features key="features" />,
								<Abilities key="abilities" />,
								<Inventory key="inventory" />,
							]}
						</Tab>
					</Grid>
				</Grid>
			</Card>
		</Page>
	)
}

export default Player