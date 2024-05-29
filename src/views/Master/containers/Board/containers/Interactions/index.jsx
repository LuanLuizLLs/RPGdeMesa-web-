import React from 'react'
import { useInteractions } from './hooks/useInteractions'
import { InteractionDetails } from './components/InteractionDetails'
import {
	Box,
	Divider,
	Grid,
	Input,
	Link,
	Modal,
	Paper,
	Text,
	Title,
} from 'components'

function Interactions() {
	const { handle, stateList, stateModal } = useInteractions()

	const [list] = stateList

	return (
		<>
			<Title type="h6">
        Quadro de interações:
			</Title>
			{Object.values(list).map((interaction, i) => (
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
					<Grid type="row" margin={[5, 0]} overflow="auto">
						<Grid type="column" minWidth={100}>
							<Input
								noLabel
								index={i}
								start="❤️"
								name="life"
								type="number"
								fontSize="medium"
								end={`/${interaction.shape.life}`}
								stateValue={stateList}
								onEnter={() => handle.updateInteraction(interaction)}
							/>
						</Grid>
						<Grid type="column" minWidth={100}>
							<Input
								noLabel
								index={i}
								start="🩸"
								name="damage"
								type="number"
								fontSize="medium"
								end={`/${interaction.shape.damage}`}
								stateValue={stateList}
								onEnter={() => handle.updateInteraction(interaction)}
							/>
						</Grid>
						<Divider borderStyle="solid" margin="0 10px" />
						<Grid type="column" minWidth={100}>
							<Input
								noLabel
								index={i}
								start="💪"
								name="strength"
								type="number"
								fontSize="medium"
								end={`/${interaction.shape.strength}`}
								stateValue={stateList}
								onEnter={() => handle.updateInteraction(interaction)}
							/>
						</Grid>
						<Grid type="column" minWidth={100}>
							<Input
								noLabel
								index={i}
								start="👋"
								name="dexterity"
								type="number"
								fontSize="medium"
								end={`/${interaction.shape.dexterity}`}
								stateValue={stateList}
								onEnter={() => handle.updateInteraction(interaction)}
							/>
						</Grid>
						<Grid type="column" minWidth={100}>
							<Input
								noLabel
								index={i}
								start="✊"
								name="constitution"
								type="number"
								fontSize="medium"
								end={`/${interaction.shape.constitution}`}
								stateValue={stateList}
								onEnter={() => handle.updateInteraction(interaction)}
							/>
						</Grid>
						<Divider borderStyle="solid" margin="0 10px" />
						<Grid type="column" minWidth={100}>
							<Input
								noLabel
								index={i}
								start="📙"
								name="intelligence"
								type="number"
								fontSize="medium"
								end={`/${interaction.shape.intelligence}`}
								stateValue={stateList}
								onEnter={() => handle.updateInteraction(interaction)}
							/>
						</Grid>
						<Grid type="column" minWidth={100}>
							<Input
								noLabel
								index={i}
								start="🙌"
								name="wisdom"
								type="number"
								fontSize="medium"
								end={`/${interaction.shape.wisdom}`}
								stateValue={stateList}
								onEnter={() => handle.updateInteraction(interaction)}
							/>
						</Grid>
						<Grid type="column" minWidth={100}>
							<Input
								noLabel
								index={i}
								start="🤝"
								name="charisma"
								type="number"
								fontSize="medium"
								end={`/${interaction.shape.charisma}`}
								stateValue={stateList}
								onEnter={() => handle.updateInteraction(interaction)}
							/>
						</Grid>
					</Grid>
				</Paper>
			))}
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetInteraction}>
				{{
					interaction_details: (
						<InteractionDetails 
							stateModal={stateModal}
							onReset={handle.resetInteraction}
							onRemove={handle.removeInteraction}
						/>
					)
				}}
			</Modal>
		</>
	)
}

export default Interactions