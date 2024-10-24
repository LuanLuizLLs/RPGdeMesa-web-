import { Box, Button, Input, Paper, Select, Text, TextArea, Title } from 'components'
import { OPTIONS } from 'utils/constants'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal

	return {
		campaign_start: (
			<>
				<Title type="h6">
          Detalhes da campanha:
				</Title>
				<Paper backgroundColor="secondary">
					<Text color="primary" fontWeight="bold">
						{modal.data.name}
					</Text>
					<Text>
						{modal.data.description}
					</Text>
				</Paper>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="bottomless" color="primary" padding={10} onClick={handle.resetCampaign}>
            Voltar
					</Button>
					<Button type="filled" padding={10} onClick={handle.startCampaign}>
            Mestrar
					</Button>
				</Box>
			</>
		),
		campaign_create: (
			<>
				<Title type="h6">
          Criar campanha:
				</Title>
				<Input
					name="name"
					placeholder="Nome"
					stateValue={stateValues}
				/>
				<Select
					name="period"
					placeholder="Período"
					options={OPTIONS.CAMPAIGNS.PERIOD}
					stateValue={stateValues}
				/>
				<Select
					name="climate"
					placeholder="Clima"
					options={OPTIONS.CAMPAIGNS.CLIMATE}
					stateValue={stateValues}
				/>
				<TextArea
					rows={3}
					name="description"
					placeholder="Descrição"
					stateValue={stateValues}
				/>
				<Box display="flex" justifyContent="flex-end">
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetCampaign}>
            Cancelar
					</Button>
					<Button type="filled" color="primary" padding={10} onClick={handle.createCampaign}>
            Criar
					</Button>
				</Box>
			</>
		),
		campaign_update: (
			<>
				<Title type="h6">
          Editar campanha:
				</Title>
				<Input
					name="name"
					placeholder="Nome"
					stateValue={stateValues}
				/>
				<TextArea
					rows={3}
					name="description"
					placeholder="Descrição"
					stateValue={stateValues}
				/>
				<Box display="flex" justifyContent="flex-end">
					<Button type="filled" color="secondary" padding={10} onClick={handle.resetCampaign}>
            Cancelar
					</Button>
					<Button type="filled" padding={10} onClick={handle.updateCampaign}>
            Salvar
					</Button>
				</Box>
			</>
		),
		campaign_delete: (
			<>
				<Title type="h6">
          Deletar campanha:
				</Title>
				<Text>
          Tem certeza que deseja excluir a campanha <b>{modal.data.name}</b>?
				</Text>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="bottomless" padding={10} onClick={handle.resetCampaign}>
            Cancelar
					</Button>
					<Button type="filled" color="error" padding={10} onClick={handle.deleteCampaign}>
            Excluir
					</Button>
				</Box>
			</>
		),
	}
}