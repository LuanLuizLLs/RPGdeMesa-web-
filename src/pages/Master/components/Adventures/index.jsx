import { Box, Button, Collapse, List, Modal, Paper, Text, Title } from 'components'
import { adventureStore } from 'pages/Master/utils/store'
import { useAdventures } from './hooks/useAdventures'
import { Modals } from './components/Modals'
import useStore from 'hooks/useStore'

function Adventures() {
	const { list, handle, stateModal, stateValues, stateCollapse } = useAdventures()
	
	const ADVENTURE = useStore(adventureStore)

	return (
		<>
			<Title type="h6">
        Aventura:
			</Title>
			<Paper backgroundColor="secondary" margin="10px 0">
				{ADVENTURE.id ? (
					<Text color="black" fontWeight="bold" textTransform="capitalize">
						{ADVENTURE.name}: <Text inline color="gray" fontWeight="bold">{ADVENTURE.description}</Text>
					</Text>
				) : (
					<Text fontWeight="bold" color="gray">
            Nenhuma aventura iniciada...
					</Text>
				)}
				<Paper backgroundColor="white" margin="10px 0">
					<Text color="gray">
						<Text inline color="primary">🎯 Objetivo: </Text>{ADVENTURE.goal || 'Nenhum'}
					</Text>
					<Text color="gray">
						<Text inline color="primary">🏆 Recompensa: </Text>{ADVENTURE.reward || 'Nenhuma'}
					</Text>
				</Paper>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button fontSize="medium" type="filled" padding={5} onClick={() => handle.openAdventure('add_adventure')}>
            Criar
					</Button>
				</Box>
			</Paper>
			<Button fontSize="larger" type="filled" onClick={() => handle.collapseAdventure('adventure')}>
        Aventuras
			</Button>
			<Collapse name="adventure" stateCollapse={stateCollapse}>
				{Boolean(list.rows.length) && (
					<List
						{...list}
						height={150}
						noColumns={true}
						onClick={(row) => handle.openAdventure('detail_adventure', row)}
						actions={{
							update: (row) => handle.openAdventure('edit_adventure', row),
						}}
					/>
				)}
			</Collapse>
			<Modal maxWidth={600} stateModal={stateModal} onClose={handle.resetAdventure}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
		</>
	)
}

export default Adventures