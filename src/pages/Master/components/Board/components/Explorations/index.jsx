import { Box, Modal, Text, Title } from 'components'
import { useExplorations } from './hooks/useExplorations'
import { Map } from './components/Map'
import { Modals } from './components/Modals'

function Explorations() {
	const { handle, stateList, stateModal, stateValues, stateAction } = useExplorations()

	const [list] = stateList
	const [action] = stateAction
	const [values] = stateValues
	
	return (
		<>
			<Title type="h6">
        Quadro de exploração:
			</Title>
			<Box height={500} overflow="auto">
				{Boolean(list.id) || (
					<Box height="100%" display="grid" placeContent="center">
						<Text color="primary" fontWeight="bold">Nenhuma exploração adicionada...</Text>
					</Box>
				)}
				{Boolean(list.id) && (
					<Map list={list} handle={handle} action={action} values={values} />
				)}
			</Box>
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetExploration}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
		</>
	)
}

export default Explorations