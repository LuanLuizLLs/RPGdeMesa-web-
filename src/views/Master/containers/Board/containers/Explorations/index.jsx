import { Box, Modal, Text, Title } from 'components'
import { useExplorations } from './hooks/useExplorations'
import { Map } from './components/Map'
import { Modals } from './components/Modals'

function Explorations() {
	const { handle, stateList, stateModal, stateValues } = useExplorations()

	const [list] = stateList
	const { board: explorations = [] } = list

	return (
		<>
			<Title type="h6">
        Quadro de exploração:
			</Title>
			{list.id && (
				<>
					<Title type="h6" textAlign="center" color="primary">
						{list.name} ({list.vertical} x {list.horizontal})
					</Title>
					<Text color="gray" fontWeight="bold" textAlign="center">
						{list.description}
					</Text>
				</>
			)}
			<Box height={500} overflow="auto">
				{!explorations.length && (
					<Box height="100%" display="grid" placeContent="center">
						<Text color="primary" fontWeight="bold">Nenhuma exploração adicionada...</Text>
					</Box>
				)}
				{!!explorations.length && (
					<Map handle={handle} explorations={explorations} />
				)}
			</Box>
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetExploration}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
		</>
	)
}

export default Explorations