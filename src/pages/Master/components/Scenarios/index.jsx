import { useSelector } from 'react-redux'
import { useScenarios } from './hooks/useScenarios'
import { Box, Button, Collapse, List, Modal, Paper, Text, Title } from 'components'
import { Modals } from './components/Modals'

function Scenarios() {
	const { list, handle, stateModal, stateValues, stateCollapse } = useScenarios()
	const { SCENERY } = useSelector(({ reducer }) => reducer)

	return (
		<>
			<Title type="h6">
        Cenário:
			</Title>
			<Paper backgroundColor="secondary" margin="10px 0">
				{SCENERY.id ? (
					<>
						<Text fontWeight="bold" color="gray">
							<Text inline fontWeight="bold" color="primary" textTransform="capitalize">{SCENERY.name}</Text>: {SCENERY.description}
						</Text>
					</>
				) : (
					<Text fontWeight="bold" color="gray">
            Nenhum cenário selecionado...
					</Text>
				)}
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button fontSize="medium" type="filled" padding={5} onClick={() => handle.openModal('add_scenery')}>
            Criar
					</Button>
				</Box>
			</Paper>
			<Button fontSize="larger" type="filled" onClick={() => handle.openCollapse('scenery')}>
        Cenários
			</Button>
			<Collapse name="scenery" stateCollapse={stateCollapse}>
				{Boolean(list.rows.length) && (
					<List
						{...list}
						height={150}
						noColumns={true}
						onClick={(row) => handle.openModal('detail_scenery', row)}
						actions={{
							update: (row) => handle.openModal('edit_scenery', row),
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

export default Scenarios