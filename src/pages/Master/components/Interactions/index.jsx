import { Box, List, Modal, Button } from 'components'
import { useInteractions } from './hooks/useInteractions'
import { Modals } from './components/Modals'

function Interactions() {
	const { list, handle, stateModal, stateValues } = useInteractions()

	return (
		<>
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetInteraction}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
			<List
				{...list}
				height={200}
				onClick={(row) => handle.openInteraction('read_interaction', row)}
				actions={{
					update: (row) => handle.openInteraction('update_interaction', row),
					delete: (row) => handle.openInteraction('delete_interaction', row),
				}}
			/>
			<Box display="flex" justifyContent="end" margin={10}>
				<Button type="filled" onClick={() => handle.openInteraction('create_interaction')}>
          Adicionar
				</Button>
			</Box>
		</>
	)
}

export default Interactions