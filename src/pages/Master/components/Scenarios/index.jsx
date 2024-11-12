import { Box, Button, Collapse, List, Modal, Paper, Text, Title } from 'components'
import { sceneryStore } from 'pages/Master/utils/store'
import { useScenarios } from './hooks/useScenarios'
import { Modals } from './components/Modals'
import useStore from 'hooks/useStore'

function Scenarios() {
	const { list, handle, stateModal, stateValues, stateCollapse } = useScenarios()
	
	const SCENERY = useStore(sceneryStore)

	return (
		<>
			<Title type="h6">
        Cenário:
			</Title>
			<Paper backgroundColor="secondary" margin="10px 0">
				{SCENERY.id ? (
					<Text color="black" fontWeight="bold">
						<Text inline textTransform="capitalize">
							{SCENERY.name}
						</Text>
						<Text color="gray">
							{SCENERY.description}
						</Text>
					</Text>
				) : (
					<Text fontWeight="bold" color="gray">
            Nenhum cenário selecionado...
					</Text>
				)}
				<Paper backgroundColor="white" margin="10px 0">
					<Text color="gray">
						<Text inline color="primary">🌐 Região: </Text>{SCENERY.region || 'Nenhuma'}
					</Text>
					<Text color="gray">
						<Text inline color="primary">👥 Cultura: </Text>{SCENERY.culture || 'Nenhuma'}
					</Text>
				</Paper>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button fontSize="medium" type="filled" padding={5} onClick={() => handle.openSecenery('add_scenery')}>
            Criar
					</Button>
				</Box>
			</Paper>
			<Button fontSize="larger" type="filled" onClick={() => handle.collapseSecenery('scenery')}>
        Cenários
			</Button>
			<Collapse name="scenery" stateCollapse={stateCollapse}>
				{Boolean(list.rows.length) && (
					<List
						{...list}
						height={150}
						noColumns={true}
						onClick={(row) => handle.openSecenery('detail_scenery', row)}
						actions={{
							update: (row) => handle.openSecenery('edit_scenery', row),
						}}
					/>
				)}
			</Collapse>
			<Modal maxWidth={600} stateModal={stateModal} onClose={handle.resetSecenery}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
		</>
	)
}

export default Scenarios