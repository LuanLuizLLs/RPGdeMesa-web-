import { useSelector } from 'react-redux'
import { useInventory } from './hooks/useInventory'
import { Modals } from './components/Modals'
import { Box, Button, List, Modal, Text } from 'components'

function Inventory() {
	const { list, handle, stateModal, stateValues } = useInventory()
	const { CHARACTER } = useSelector(({ reducer }) => reducer)

	return (
		<>
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetInventory}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
			<List 
				{...list}
				height={200} 
				onClick={(row) => handle.openModal('detail_item', row)} 
			/>
			<Box display="flex" justifyContent="space-between" margin={10}>
				<Text fontWeight="bold">
					<Text inline color="primary">Capacidade: </Text> {CHARACTER.physical_capacity}
				</Text>
				<Button type="filled" onClick={() => Boolean(CHARACTER.id) && handle.openModal('add_item')}>
          Adicionar
				</Button>
			</Box>
		</>
	)
}

export default Inventory