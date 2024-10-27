import { Box, Button, Input, Paper, Text, TextArea, Title } from 'components'
import { SCENERY } from 'utils/constants'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal

	return {
		add_scenery: (
			<>
				<Title type="h6">
          Criar cenário:
				</Title>
				<Input
					name="name"
					label="Cenário:"
					placeholder="Nome"
					stateValue={stateValues}
				/>
				<TextArea
					name="description"
					label="Descreva o cenário:"
					placeholder="Descrição"
					stateValue={stateValues}
				/>
				<Input
					name="region"
					placeholder="Região"
					stateValue={stateValues}
					start={SCENERY.ICONS.REGION}
				/>
				<Input
					name="culture"
					placeholder="Cultura"
					stateValue={stateValues}
					start={SCENERY.ICONS.CULTURE}
				/>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" color="secondary" padding={5} onClick={handle.generateSecenery}>
            Gerar
					</Button>
					<Button type="filled" padding={5} onClick={handle.createScenery}>
            Criar
					</Button>
				</Box>
			</>
		),
		detail_scenery: (
			<>
				<Title type="h6">
          Detalhes do cenário:
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
					<Button type="filled" color="error" padding={5} onClick={handle.deleteScenery}>
            Excluir
					</Button>
					<Button type="filled" padding={5} onClick={handle.startScenery}>
            Selecionar
					</Button>
				</Box>
			</>
		),
		edit_scenery: (
			<>
				<Title type="h6">
          Editar cenário:
				</Title>
				<Input
					name="name"
					label="Cenário:"
					placeholder="Nome"
					stateValue={stateValues}
				/>
				<TextArea
					name="description"
					label="Descrição da cenário:"
					placeholder="Descrição"
					stateValue={stateValues}
				/>
				<Input
					name="region"
					placeholder="Região"
					stateValue={stateValues}
					start={SCENERY.ICONS.REGION}
				/>
				<Input
					name="culture"
					placeholder="Cultura"
					stateValue={stateValues}
					start={SCENERY.ICONS.CULTURE}
				/>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" color="secondary" padding={5} onClick={handle.resetSecenery}>
            Cancelar
					</Button>
					<Button type="filled" padding={5} onClick={handle.updateScenery}>
            Salvar
					</Button>
				</Box>
			</>
		),
	}
}