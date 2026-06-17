import imageMaster from 'assets/img/master.png'
import { Modals } from './components/Modals'
import { useCampaigns } from './hooks/useCampaigns'
import { Button, Card, Image, List, Title, Modal } from 'components'

function Campaigns() {
	const { list, handle, stateModal, stateValues } = useCampaigns()

	return (
		<>
			<Modal
				maxWidth={450}
				stateModal={stateModal}
				onClose={handle.resetCampaign}
			>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
			<Card>
				<Image
					maxHeight={100}
					maxWidth={100}
					margin="0 auto"
					alt="mapa de aventura"
					src={imageMaster}
				/>
				<Title type="h4" textAlign="center">
          Lista de Campanhas:
				</Title>
				<List
					height={300}
					{...list}
					onClick={(row) => handle.openModal('campaign_start', row)}
					actions={{
						update: (row) => handle.openModal('campaign_update', row),
						delete: (row) => handle.openModal('campaign_delete', row),
					}}
				/>
				<Button type="filled" padding={10} onClick={() => handle.openModal('campaign_create')}>
          Criar campanha
				</Button>
			</Card>
		</>
	)
}

export default Campaigns