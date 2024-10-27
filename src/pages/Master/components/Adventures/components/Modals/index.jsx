import { Box, Button, Input, Paper, Text, TextArea, Title } from 'components'
import { ADVENTURE } from 'utils/constants'

export function Modals({ handle, stateModal, stateValues }) {
	const [modal] = stateModal

	return {
		add_adventure: (
			<>
				<Title type="h6">
          Criar aventura:
				</Title>
				<Input
					name="name"
					label="Aventura:"
					placeholder="Nome"
					stateValue={stateValues}
				/>
				<TextArea
					name="description"
					label="Descreva a aventura:"
					placeholder="Descrição"
					stateValue={stateValues}
				/>
				<Input
					name="goal"
					placeholder="Objetivo"
					stateValue={stateValues}
					start={ADVENTURE.ICONS.GOAL}
				/>
				<Input
					name="reward"
					placeholder="Recompensa"
					stateValue={stateValues}
					start={ADVENTURE.ICONS.REWARD}
				/>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" color="secondary" padding={5} onClick={handle.generateAdventure}>
            Gerar
					</Button>
					<Button type="filled" padding={5} onClick={handle.createAdventure}>
            Criar
					</Button>
				</Box>
			</>
		),
		detail_adventure: (
			<>
				<Title type="h6">
          Detalhes da aventura:
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
					<Button type="filled" color="error" padding={5} onClick={handle.deleteAdventure}>
            Excluir
					</Button>
					<Button type="filled" padding={5} onClick={handle.startAdventure}>
            Iniciar
					</Button>
				</Box>
			</>
		),
		edit_adventure: (
			<>
				<Title type="h6">
          Editar aventura:
				</Title>
				<Input
					name="name"
					label="Aventura:"
					placeholder="Nome"
					stateValue={stateValues}
				/>
				<TextArea
					name="description"
					label="Descrição da aventura:"
					placeholder="Descrição"
					stateValue={stateValues}
				/>
				<Input
					name="goal"
					placeholder="Objetivo"
					stateValue={stateValues}
					start={ADVENTURE.ICONS.GOAL}
				/>
				<Input
					name="reward"
					placeholder="Recompensa"
					stateValue={stateValues}
					start={ADVENTURE.ICONS.REWARD}
				/>
				<Box display="flex" justifyContent="flex-end" marginTop={10}>
					<Button type="filled" color="secondary" padding={5} onClick={handle.resetAdventure}>
            Cancelar
					</Button>
					<Button type="filled" padding={5} onClick={handle.updateAdventure}>
            Salvar
					</Button>
				</Box>
			</>
		),
	}
}