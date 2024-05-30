import React from 'react'
import { useSelector } from 'react-redux'
import { Modals } from './components/Modals'
import { useAbilities } from './hooks/useAbilities'
import { Box, Button, List, Modal, Text } from 'components'

function Abilities() {
	const { list, handle, stateModal, stateValues } = useAbilities()
	const { CHARACTER } = useSelector(({ reducer }) => reducer)

	return (
		<>
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetAbility}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
			<List 
				{...list}
				height={200} 
				onClick={(row) => handle.openModal('detail_ability', row)} 
			/>
			<Box display="flex" justifyContent="space-between" margin={10}>
				<Text fontWeight="bold">
					<Text inline color="primary">Capacidade: </Text> {CHARACTER.mental_capacity}
				</Text>
				<Button type="filled" onClick={() => Boolean(CHARACTER.id) && handle.openModal('add_ability')}>
          Adicionar
				</Button>
			</Box>
		</>
	)
}

export default Abilities