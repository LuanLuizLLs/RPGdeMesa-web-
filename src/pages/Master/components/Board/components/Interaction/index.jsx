import { Box, Divider, Grid, Input, Link, Modal, Paper, Text, Title } from 'components'
import { useInteraction } from './hooks/useInteraction'
import { Modals } from './components/Modals'
import { ATTRIBUTE } from 'utils/constants'

function Interaction() {
	const { handle, stateTab, stateList, stateModal } = useInteraction()

	const [list] = stateList
	const interactions = Object.values(list)

	return (
		<>
			<Title type="h6">
        Quadro de interação:
			</Title>
			<Box height={500} overflow="auto">
				{!interactions.length && (
					<Box height="100%" display="grid" placeContent="center">
						<Text color="primary" fontWeight="bold">Nenhuma interação adicionada...</Text>
					</Box>
				)}
				{!!interactions.length && interactions.map((interaction, i) => (
					<Paper key={i} backgroundColor="secondary" margin="10px 0">
						<Box margin={5}>
							<Text inline color="primary" fontWeight="bold">
              #{i + 1}&nbsp;
								<Link target="_blank" onClick={() => handle.openInteraction('interaction_details', interaction)}>
									{interaction.shape.name}
								</Link>
              &nbsp;(Lv {interaction.shape.level})
							</Text>
							<Text color="gray" fontSize="small">
								{interaction.shape.description}
							</Text>
						</Box>
						<Divider borderStyle="solid" margin="0" />
						<Grid type="row" margin={[5, 0]} overflow="auto" maxWidth={1000}>
							<Grid type="column" minWidth={100}>
								<Input
									noLabel
									index={i}
									start={ATTRIBUTE.ICONS.VID}
									name="life"
									type="number"
									fontSize="medium"
									end={`/${interaction.shape.life}`}
									stateValue={stateList}
									onBlur={() => handle.updateInteraction(interaction)}
								/>
							</Grid>
							<Grid type="column" minWidth={100}>
								<Input
									noLabel
									index={i}
									start={ATTRIBUTE.ICONS.DAD}
									name="modifier"
									type="number"
									fontSize="medium"
									end={`/${interaction.shape.modifier}`}
									stateValue={stateList}
									onBlur={() => handle.updateInteraction(interaction)}
								/>
							</Grid>
							<Divider borderStyle="solid" margin="0 10px" />
							<Grid type="column" minWidth={100}>
								<Input
									noLabel
									index={i}
									start={ATTRIBUTE.ICONS.FOR}
									name="strength"
									type="number"
									fontSize="medium"
									end={`/${interaction.shape.strength}`}
									stateValue={stateList}
									onBlur={() => handle.updateInteraction(interaction)}
								/>
							</Grid>
							<Grid type="column" minWidth={100}>
								<Input
									noLabel
									index={i}
									start={ATTRIBUTE.ICONS.DES}
									name="dexterity"
									type="number"
									fontSize="medium"
									end={`/${interaction.shape.dexterity}`}
									stateValue={stateList}
									onBlur={() => handle.updateInteraction(interaction)}
								/>
							</Grid>
							<Grid type="column" minWidth={100}>
								<Input
									noLabel
									index={i}
									start={ATTRIBUTE.ICONS.CON}
									name="constitution"
									type="number"
									fontSize="medium"
									end={`/${interaction.shape.constitution}`}
									stateValue={stateList}
									onBlur={() => handle.updateInteraction(interaction)}
								/>
							</Grid>
							<Divider borderStyle="solid" margin="0 10px" />
							<Grid type="column" minWidth={100}>
								<Input
									noLabel
									index={i}
									start={ATTRIBUTE.ICONS.INT}
									name="intelligence"
									type="number"
									fontSize="medium"
									end={`/${interaction.shape.intelligence}`}
									stateValue={stateList}
									onBlur={() => handle.updateInteraction(interaction)}
								/>
							</Grid>
							<Grid type="column" minWidth={100}>
								<Input
									noLabel
									index={i}
									start={ATTRIBUTE.ICONS.SAB}
									name="wisdom"
									type="number"
									fontSize="medium"
									end={`/${interaction.shape.wisdom}`}
									stateValue={stateList}
									onBlur={() => handle.updateInteraction(interaction)}
								/>
							</Grid>
							<Grid type="column" minWidth={100}>
								<Input
									noLabel
									index={i}
									start={ATTRIBUTE.ICONS.CAR}
									name="charisma"
									type="number"
									fontSize="medium"
									end={`/${interaction.shape.charisma}`}
									stateValue={stateList}
									onBlur={() => handle.updateInteraction(interaction)}
								/>
							</Grid>
						</Grid>
					</Paper>
				))}
			</Box>
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetInteraction}>
				{Modals({ handle, stateTab, stateModal })}
			</Modal>
		</>
	)
}

export default Interaction