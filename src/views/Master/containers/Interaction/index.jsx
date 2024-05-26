import React from 'react'
import { Box, List, Modal, Button } from '../../../../components'
import { CreateInteraction } from './components/CreateInteraction'
import { ReadInteraction } from './components/ReadInteraction'
import { UpdateInteraction } from './components/UpdateInteraction'
import { DeleteInteraction } from './components/DeleteInteraction'
import { useInteractions } from './hooks/useInteraction'

function Interaction() {
	const { list, handle, stateModal, stateValues } = useInteractions()

	return (
		<>
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetInteraction}>
				{{
					create_interaction: (
						<CreateInteraction
							stateValues={stateValues}
							onReset={handle.resetInteraction}
							onCreate={handle.createInteraction}
						/>
					),
					read_interaction: (
						<ReadInteraction
							stateModal={stateModal}
							onReset={handle.resetInteraction}
							onStart={handle.startInteraction}
						/>
					),
					update_interaction: (
						<UpdateInteraction
							stateValues={stateValues}
							onReset={handle.resetInteraction}
							onUpdate={handle.updateInteraction}
						/>
					),
					delete_interaction: (
						<DeleteInteraction
							stateModal={stateModal}
							onReset={handle.resetInteraction}
							onDelete={handle.updateInteraction}
						/>
					)
				}}
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

export default Interaction