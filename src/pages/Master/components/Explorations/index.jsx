import { useExplorations } from './hooks/useExplorations'
import { Box, List, Modal, Button } from 'components'
import { Modals } from './components/Modals'

function Explorations() {
	const { list, handle, stateModal, stateValues } = useExplorations()

	return (
		<>
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetExploration}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
			<List
				{...list}
				height={200}
				onClick={(row) => handle.openExploration('read_exploration', row)}
				actions={{
					update: (row) => handle.openExploration('update_exploration', row),
					delete: (row) => handle.openExploration('delete_exploration', row),
				}}
			/>
			<Box display="flex" justifyContent="end" margin={10}>
				<Button type="filled" onClick={() => handle.openExploration('create_exploration')}>
          Adicionar
				</Button>
			</Box>
		</>
	)
}

export default Explorations