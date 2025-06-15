import { characterStore } from 'pages/Player/utils/store'
import { useAbilities } from './hooks/useAbilities'
import { Modals } from './components/Modals'
import { Box, Button, List, Modal, Text } from 'components'
import useStore from 'hooks/useStore'

function Abilities() {
	const { list, handle, stateModal, stateValues } = useAbilities()

	const CHARACTER = useStore(characterStore)

	return (
		<>
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetAbility}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
			<List 
				{...list}
				height={200} 
				onClick={(row) => handle.openModal('read_ability', row)}
				actions={{
					update: (row) => handle.openModal('update_ability', row),
					delete: (row) => handle.openModal('delete_ability', row),
				}}
			/>
			<Box display="flex" justifyContent="space-between" margin={10}>
				<Text fontWeight="bold">
					<Text inline color="primary">Capacidade: </Text> {CHARACTER.capacity.mental}
				</Text>
				<Button type="filled" onClick={() => Boolean(CHARACTER.id) && handle.openModal('create_ability')}>
          Adicionar
				</Button>
			</Box>
		</>
	)
}

export default Abilities