import { characterStore } from 'pages/Player/utils/store'
import { useInventory } from './hooks/useInventory'
import { Modals } from './components/Modals'
import { Box, Button, List, Modal, Text } from 'components'
import useStore from 'hooks/useStore'

function Inventory() {
	const { list, handle, stateModal, stateValues } = useInventory()

	const CHARACTER = useStore(characterStore)

	return (
		<>
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetInventory}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
			<List 
				{...list}
				height={200} 
				onClick={(row) => handle.openModal('read_item', row)}
				actions={{
					update: (row) => handle.openModal('update_item', row),
					delete: (row) => handle.openModal('delete_item', row),
				}}
			/>
			<Box display="flex" justifyContent="space-between" margin={10}>
				<Text fontWeight="bold">
					<Text inline color="primary">Capacidade: </Text> {CHARACTER.capacity.physical}
				</Text>
				<Button type="filled" onClick={() => Boolean(CHARACTER.id) && handle.openModal('create_item')}>
          Adicionar
				</Button>
			</Box>
		</>
	)
}

export default Inventory