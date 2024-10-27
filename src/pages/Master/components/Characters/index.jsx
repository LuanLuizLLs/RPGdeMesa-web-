import theme from 'utils/theme'
import imagePlayer from 'assets/img/player.png'
import { Modals } from './components/Modals'
import { ATTRIBUTE } from 'utils/constants'
import { useCharacters } from './hooks/useCharacters'
import { Box, Button, Divider, Grid, Image, Input, Link, Modal,  Paper, Text } from 'components'

function Characters() {
	const { handle, stateList, stateModal, stateValues } = useCharacters()

	const [list] = stateList

	return (
		<>
			{Object.values(list).map((character, i) => (
				<Box
					key={character.id}
					margin="5px 0"
					borderRadius={10}
					borderStyle="solid"
					borderColor={theme.primary}
					position="relative"
				>
					<Box position="absolute" top={15} right={20}>
						<Link textDecoration="none" onClick={() => Boolean(character.id) && handle.openAdventure('remove_character', list[i])}>
              &#10006;
						</Link>
					</Box>
					<Grid type="container">
						<Grid type="row" alignItems="center" justifyContent="center">
							<Grid type="column" flex="none" padding={[5, 5]}>
								<Paper backgroundColor="secondary" borderRadius="50%">
									<Image
										maxHeight={60}
										maxWidth={60}
										src={imagePlayer}
										alt="Armadura de cavaleiro"
									/>
								</Paper>
							</Grid>
							<Grid type="column" padding={[5, 5]} minWidth={300}>
								<Paper backgroundColor="secondary">
									<Text fontSize="medium">
										<Link target="_blank" {...Boolean(character.id) && { href: `/player/${character.id}` }}>
											{character.name}
										</Link> ({character.race} | {character.caste} | {character.tendency})
									</Text>
									<Text fontSize="small" color="gray">
										{character.description}
									</Text>
									<Divider borderStyle="solid" margin="0" />
									<Grid type="row" overflow="auto" maxWidth={400}>
										<Grid type="column" minWidth={80}>
											<Input
												index={i}
												name="life"
												type="number"
												fontSize="medium"
												start={ATTRIBUTE.ICONS.VID}
												end={`/${character.life_capacity}`}
												readOnly={!character.id}
												stateValue={stateList}
												onBlur={() => handle.updateCharacter(i)}
											/>
										</Grid>
										<Grid type="column" minWidth={80}>
											<Input
												index={i}
												name="actions"
												type="number"
												fontSize="medium"
												start={ATTRIBUTE.ICONS.ACO}
												readOnly={!character.id}
												stateValue={stateList}
												onBlur={() => handle.updateCharacter(i)}
											/>
										</Grid>
										<Grid type="column" minWidth={80}>
											<Input
												index={i}
												name="coins"
												type="number"
												fontSize="medium"
												start={ATTRIBUTE.ICONS.MOE}
												readOnly={!character.id}
												stateValue={stateList}
												onBlur={() => handle.updateCharacter(i)}
											/>
										</Grid>
									</Grid>
									<Divider borderStyle="solid" margin="10px 0 0" />
									<Grid type="row">
										<Grid type="column" flex="none" padding={[5, 10]}>
											<Text fontSize="medium">
												{ATTRIBUTE.ICONS.FOR} FOR {character.strength} | {ATTRIBUTE.ICONS.DES} DES {character.dexterity} | {ATTRIBUTE.ICONS.CON} CON {character.constitution}
											</Text>
										</Grid>
										<Grid type="column" flex="none" padding={[5, 10]}>
											<Text fontSize="medium">
												{ATTRIBUTE.ICONS.INT} INT {character.intelligence} | {ATTRIBUTE.ICONS.SAB} SAB {character.wisdom} | {ATTRIBUTE.ICONS.CAR} CAR {character.charisma}
											</Text>
										</Grid>
									</Grid>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			))}
			<Modal maxWidth={350} stateModal={stateModal} onClose={handle.resetCharacter}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
			<Box display="flex" justifyContent="flex-end">
				<Button type="filled" padding={10} onClick={() => handle.openAdventure('add_character')}>
          Adicionar
				</Button>
			</Box>
		</>
	)
}

export default Characters