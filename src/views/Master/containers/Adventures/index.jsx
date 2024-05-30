import React from 'react'
import { useSelector } from 'react-redux'
import { useAdventures } from './hooks/useAdventures'
import { Box, Button, Collapse, List, Modal, Paper, Text, Title } from 'components'
import { Modals } from './components/Modals'

function Adventures() {
	const { list, handle, stateModal, stateValues, stateCollapse } = useAdventures()
	const { ADVENTURE } = useSelector(({ reducer }) => reducer)

	return (
		<>
			<Title type="h6">
        Aventura:
			</Title>
			<Paper backgroundColor="secondary" margin="10px 0">
				{ADVENTURE.id ? (
					<>
						<Text fontWeight="bold" color="gray">
							<Text inline fontWeight="bold" color="primary" textTransform="capitalize">{ADVENTURE.name}:</Text> {ADVENTURE.description}
						</Text>
					</>
				) : (
					<Text fontWeight="bold" color="gray">
            Nenhuma aventura iniciada...
					</Text>
				)}
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button fontSize="medium" type="filled" padding={5} onClick={() => handle.openModal('add_adventure')}>
            Criar
					</Button>
				</Box>
			</Paper>
			<Button fontSize="larger" type="filled" onClick={() => handle.openCollapse('adventure')}>
        Aventuras
			</Button>
			<Collapse name="adventure" stateCollapse={stateCollapse}>
				{Boolean(list.rows.length) && (
					<List
						{...list}
						height={150}
						noColumns={true}
						onClick={(row) => handle.openModal('detail_adventure', row)}
						actions={{
							update: (row) => handle.openModal('edit_adventure', row),
						}}
					/>
				)}
			</Collapse>
			<Modal maxWidth={450} stateModal={stateModal} onClose={handle.resetValues}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
		</>
	)
}

export default Adventures